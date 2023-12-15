import QuinyxLeave from "./QuinyxLeave";

interface QuinyxLeaveResponse {
  pagination: {
    perPage: number,
    page: number,
    totalPages: number,
    totalItems: number,
  },
  leaveApps: QuinyxLeave[],
}

export default QuinyxLeaveResponse;
