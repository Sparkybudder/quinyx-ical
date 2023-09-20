// import { HandlerEvent } from '@netlify/functions';
import ical from 'ical-generator';
import QuinyxAuthRequest from '../types/QuinyxAuthRequest';
import QuinyxAuthResponse from '../types/QuinyxAuthResponse';
import QuinyxShiftRequest from '../types/QuinyxShiftRequest';
import QuinyxShiftResponse from '../types/QuinyxShiftResponse';
import ShiftStatus from '../types/ShiftStatus';
import QuinyxSchedule from '../types/QuinyxSchedule';

// Urls
const authQuinyx = 'https://app.quinyx.com/api/2.0/oauth/token';
const shiftsQuinyx = 'https://app.quinyx.com/api/2.0/user/shift';

// Secrets
const quinyxUsername = process.env.QUINYX_USERNAME as string;
const quinyxPassword = process.env.QUINYX_PASSWORD as string;

const generateQuinyxToken = async () => {
  const body: QuinyxAuthRequest = {
    grantType: 'password',
    username: quinyxUsername,
    password: quinyxPassword,
  };

  const response = await fetch(authQuinyx, { method: 'POST', body: `${JSON.stringify(body)}`, headers: { 'Content-Type': 'application/json' }});
  const data: QuinyxAuthResponse = await response.json();

  return data.token.accessToken;
};

const getUpcomingShifts = async (token: string) => {
  const body: QuinyxShiftRequest = {
    shiftType: ShiftStatus.MyShifts,
    days: 60,
  };
  const url = `${shiftsQuinyx}?${new URLSearchParams(body as never)}`;

  const response = await fetch(url, { method: 'GET', headers: { 'Authorization': `Bearer ${token}` }});
  const data: QuinyxShiftResponse = await response.json();

  return data.schedule;
};

const generateCalendar = (schedule: QuinyxSchedule[]) => {
  const calendar = ical({ name: 'Quinyx Shifts' });
  calendar.timezone('Europe/Stockholm');

  schedule.map((shift) => {
    const { startDate, endDate } = shift;
    calendar.createEvent({
      start: new Date(startDate),
      end: new Date(endDate),
      summary: 'Quinyx Shift',
      description: 'Quinyx Shift',
    });
  });

  return calendar;
};

const handler = async () => {
  try {
    const token = await generateQuinyxToken();
    const shifts = await getUpcomingShifts(token);
    const calendar = generateCalendar(shifts);

    return {
      statusCode: 200,
      body: calendar.toString(),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify(err),
    };
  }
};

export { handler };
