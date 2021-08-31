export interface LeaveRequest {
  uid: string;
  email: string;
  startDate: string;
  endDate: string;
  transport: string;
  where: string;
}

export interface StayRequest {
  uid: string;
  email: string;
  startDate: string;
  endDate: string;
  reason: string;
}