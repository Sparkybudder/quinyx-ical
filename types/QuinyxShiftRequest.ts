import ShiftStatus from './ShiftStatus';

interface QuinyxShiftRequest {
  shiftType: ShiftStatus,
  fromDate?: string,
  toDate?: string,
  days?: number,
}

export default QuinyxShiftRequest;
