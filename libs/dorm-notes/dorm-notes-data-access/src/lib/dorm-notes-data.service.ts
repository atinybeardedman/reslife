import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DormNoteField, DormNoteMetaDoc } from '@reslife/dorm-notes-model';
import { DormDatePickerEvent, DormDocument } from '@reslife/shared-models';
@Injectable({
  providedIn: 'root'
})
export class DormNotesDataService {
  private selectedDoc!: AngularFirestoreDocument<DormNoteMetaDoc>; 
  constructor(private af: AngularFirestore) { }

  
  getActiveDorms(): Observable<string[]> {
    return this.af
      .collection<DormDocument>('dorms', (ref) =>
        ref.where('isActive', '==', true)
      )
      .valueChanges()
      .pipe(map((docs) => docs.map((d) => d.name)));
  }

  setDormandDate({dorm, date}: DormDatePickerEvent): void{
    this.selectedDoc = this.af.doc(`dormNotes/${date}+${dorm}`);
  }

  getFields(): Observable<DormNoteField[]>{
    return this.selectedDoc.collection<DormNoteField>('notes', ref => ref.orderBy('order')).valueChanges();
  }

  updateField(field: Partial<DormNoteField>): Promise<void>{
    return this.selectedDoc.collection('notes').doc(field.uid).update(field);
  }
}
