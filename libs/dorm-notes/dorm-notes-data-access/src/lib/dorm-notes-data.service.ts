import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DormNoteField, DormNoteMetaDoc } from '@reslife/dorm-notes-model';
import { DormDatePickerEvent, DormDocument } from '@reslife/shared-models';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class DormNotesDataService {
  private selectedDoc!: AngularFirestoreDocument<DormNoteMetaDoc>; 
  constructor(private af: AngularFirestore, private auth: AngularFireAuth) { }

  
  getActiveDorms(): Observable<string[]> {
    return this.af
      .collection<DormDocument>('dorms', (ref) =>
        ref.where('isActive', '==', true)
      )
      .valueChanges()
      .pipe(map((docs) => docs.map((d) => d.name)));
  }

  setDormandDate({dorm, date}: DormDatePickerEvent): void{
    this.selectedDoc = this.af.doc(`dorm-notes/${date}+${dorm}`);
  }

  getFields(): Observable<DormNoteField[]>{
    return this.selectedDoc.collection<DormNoteField>('notes', ref => ref.orderBy('order')).valueChanges();
  }

  async updateField(field: Partial<DormNoteField>): Promise<void>{
    const user = await this.auth.currentUser;
    if(user){
      field.author = user.displayName as string;
    }
    return this.selectedDoc.collection('notes').doc(field.uid).update(field);
  }
}
