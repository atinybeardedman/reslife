export interface LeaveRequest {
  uid: string;
  email: string;
  startDate: string;
  endDate: string;
  transport: string;
  where: string;
  name: string;
}

export interface StayRequest {
  uid: string;
  email: string;
  startDate: string;
  endDate: string;
  reason: string;
  name: string;
}