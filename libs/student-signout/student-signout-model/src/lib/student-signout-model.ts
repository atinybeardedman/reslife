export type TransportMethod = 'Walk' | 'Bike' | 'Car';

export interface StudentSignout{
  student: {
    name: string,
    uid: string
  },
  timeOut: string,
  timeIn?: string,
  destination: string,
  transport: TransportMethod,
  transportNote?: string // only set if there's a car
  
}
