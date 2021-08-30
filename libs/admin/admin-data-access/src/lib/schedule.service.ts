import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ScheduleDayException, ScheduleItem } from '@reslife/admin-model';
import { getAcademicYear } from '@reslife/utils';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  constructor(private af: AngularFirestore) {}

  getAcademicYears(): Observable<string[]> {
    // TODO: change to real database method
    return of([getAcademicYear()]);
  }

  async getSuggestedYear(): Promise<string> {
    const years = await this.getAcademicYears().pipe(take(1)).toPromise();
    const currentYear = getAcademicYear();
    if (years.length === 0) {
      return '';
    } else if (years.includes(currentYear)) {
      return currentYear;
    } else {
      return years.pop() as string;
    }
  }

  getScheduleItems(year: string): Observable<ScheduleItem[]> {
    return this.af
      .collection<ScheduleItem>('regular-schedule', (ref) =>
        ref.where('academicYear', '==', year).orderBy('startTime')
      )
      .valueChanges();
  }

  addScheduleItem(item: ScheduleItem): Promise<void> {
    item.uid = this.af.createId();
    return this.af.doc(`regular-schedule/${item.uid}`).set(item);
  }
  updateScheduleItem(item: ScheduleItem): Promise<void> {
    return this.af.doc(`regular-schedule/${item.uid}`).update(item);
  }
  deleteScheduleItem(item: ScheduleItem): Promise<void> {
    return this.af.doc(`regular-schedule/${item.uid}`).delete();
  }

  getExceptionsByYear(year: string): Observable<ScheduleDayException[]> {
    return this.af
      .collection<ScheduleDayException>('schedule-exceptions', (ref) =>
        ref.where('academicYear', '==', year)
      )
      .valueChanges();
  }

  addException(exception: ScheduleDayException): Promise<void> {
    exception.uid = this.af.createId();
    return this.af.doc(`schedule-exceptions/${exception.uid}`).set(exception);
  }
  updateException(exception: ScheduleDayException): Promise<void> {
    return this.af.doc(`schedule-exceptions/${exception.uid}`).update(exception);
  }
  deleteException(exception: ScheduleDayException): Promise<void> {
    return this.af.doc(`schedule-exceptions/${exception.uid}`).delete();
  }
}
