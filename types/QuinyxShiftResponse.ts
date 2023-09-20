import QuinyxSchedule from "./QuinyxSchedule";

interface QuinyxShiftResponse {
  pagination: {
    perPage: number,
    page: number,
    totalPages: number,
    totalItems: number,
  },
  schedule: QuinyxSchedule[],
  collapsedShifts: [],
}

export default QuinyxShiftResponse;
