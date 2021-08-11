export interface MaintenanceRequest {
  subject: string;
  building: string;
  room?: string;
  request: string;
  date: string;
}

export interface MaintenanceRequestDoc extends MaintenanceRequest{
  requestor: {
    name: string,
    email: string,
    uid: string
  };
  uid: string;
}