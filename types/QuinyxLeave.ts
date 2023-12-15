interface QuinyxLeave {
  id: number,
  startDate: string,
  endDate: string,
  beenViewed: number,
  approvedPayment: boolean,
  approvedLeaveByEmployee: boolean,
  isPreliminary: boolean,
  bodyText: string,
  senddate: string,
  ts: string,
  reportTo: {
    id: number,
    name: string,
    unitId: number,
    sectionId: null,
    rname: string,
    sectionName: string,
  },
  employee: {
    id: number,
    givenName: string,
    familyName: string,
    unitId: number,
    pictureURL: string,
  },
  reason: {
    id: number,
    ttext: string,
  },
  schedule: null,
}

export default QuinyxLeave;