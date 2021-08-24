import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ScheduleItem } from '@reslife/admin-model';
import { getAcademicYear } from '@reslife/utils';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  constructor(private af: AngularFirestore) {}

  getAcademicYears(): Observable<string[]> {
    return of([getAcademicYear()])
  }

  async getSuggestedYear(): Promise<string> {
   const years = await this.getAcademicYears().pipe(take(1)).toPromise();
   const currentYear = getAcademicYear();
   if(years.length === 0){
     return ''
   }
   else if(years.includes(currentYear)){
     return currentYear
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
}
