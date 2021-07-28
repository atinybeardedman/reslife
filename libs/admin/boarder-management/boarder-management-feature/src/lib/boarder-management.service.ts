import { Injectable } from '@angular/core';
import { Boarder } from '@reslife/shared-models';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BoarderManagementService {

  // constructor() { }

  getActiveBoarders(): Observable<Boarder[]> {
    return of([]);
  }
}
