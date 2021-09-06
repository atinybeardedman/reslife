import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
@NgModule({
  imports: [CommonModule, AngularFirestoreModule, AngularFireAuthModule],
})
export class DormNotesDataAccessModule {}
