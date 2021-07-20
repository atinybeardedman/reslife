import { Injectable } from '@angular/core';
import { CheckInItem, CheckInRecord, ExcusedRecord } from '@reslife/check-ins/check-in-model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CheckInDataService {
  // constructor() {}
  getCheckInOpts(date: string): Observable<string[]> {
    return of(['Dinner']);
  }
  getToCheck(date: string, checkin: string): Observable<CheckInItem[]> {
    return of([
      {
        name: 'Test 1',
        uid: '1'
      },
      {
        name: 'Test 2',
        uid: '2'
      },
      {
        name: 'Test 3',
        uid: '3'
      },
    ])
  }
  getChecked(date: string, checkin: string): Observable<CheckInRecord[]> {
    return of([
      {
        name: 'Test 4',
        uid: '4',
        code: 'X',
              },
      {
        name: 'Test 5',
        uid: '5',
        code: 'LT',
      },
      {
        name: 'Test 6',
        uid: '6',
        code: 'X',
      },
    ])
  }
  getExcused(date: string, checkin: string): Observable<ExcusedRecord[]> {
    return of([
      {
        name: 'Test 7',
        uid: '7',
        note: 'Home'
      }
    ])
  }
  checkIn(item: CheckInItem, date: string, checkin: string): void {
    return
  }
  unCheckIn(item: CheckInRecord, date: string, checkin: string): void {
    return
  }
}
