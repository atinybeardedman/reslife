import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MaintenanceRequest, MaintenanceRequestDoc, testRequests} from '@reslife/maintenance-request-model'
@Injectable({
  providedIn: 'root'
})
export class MaintenanceRequestDataService {

  // constructor() { }

  getRequests(): Observable<MaintenanceRequestDoc[]> {
    return of(testRequests);
  }

  addRequest(request: MaintenanceRequest): Promise<void> {
    console.log(request);
    return new Promise(() => {return });
  }
}
