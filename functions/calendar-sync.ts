import ical, { ICalEventBusyStatus } from 'ical-generator';
import QuinyxAuthRequest from '../types/QuinyxAuthRequest';
import QuinyxAuthResponse from '../types/QuinyxAuthResponse';
import QuinyxShiftRequest from '../types/QuinyxShiftRequest';
import QuinyxShiftResponse from '../types/QuinyxShiftResponse';
import ShiftStatus from '../types/ShiftStatus';
import QuinyxSchedule from '../types/QuinyxSchedule';
import QuinyxLeaveRequest from '../types/QuinyxLeaveRequest';
import QuinyxLeaveResponse from '../types/QuinyxLeaveResponse';
import QuinyxLeave from '../types/QuinyxLeave';

// Urls
const authQuinyx = 'https://app.quinyx.com/api/2.0/oauth/token';
const shiftsQuinyx = 'https://app.quinyx.com/api/2.0/user/shift';
const leaveQuinyx = 'https://app.quinyx.com/api/2.0/user/leave';

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

const getUpcomingLeave = async (token: string) => {
  const body: QuinyxLeaveRequest = {
    days: 60,
  };
  const url = `${leaveQuinyx}?${new URLSearchParams(body as never)}`;

  const response = await fetch(url, { method: 'GET', headers: { 'Authorization': `Bearer ${token}` }});
  const data: QuinyxLeaveResponse = await response.json();

  return data.leaveApps;
};

const generateCalendar = (schedule: QuinyxSchedule[], leaves: QuinyxLeave[]) => {
  const calendar = ical({ name: 'Quinyx Shifts' });
  calendar.timezone('Europe/Stockholm');

  // Add shift schedule
  schedule.forEach((shift) => {
    const { startDate, endDate } = shift;
    calendar.createEvent({
      start: new Date(startDate),
      end: new Date(endDate),
      summary: 'Quinyx Shift',
      description: 'Quinyx Shift',
    });
  });

  // Add leave schedule
  leaves.forEach((leave) => {
    const { startDate, endDate, reason } = leave;
    calendar.createEvent({
      start: new Date(startDate),
      end: new Date(endDate),
      summary: reason.ttext,
      description: reason.ttext,
      busystatus: ICalEventBusyStatus.OOF,
    });
  });

  return calendar;
};

const handler = async () => {
  try {
    const token = await generateQuinyxToken();
    const shifts = await getUpcomingShifts(token);
    const leaves = await getUpcomingLeave(token);
    const calendar = generateCalendar(shifts, leaves);

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
