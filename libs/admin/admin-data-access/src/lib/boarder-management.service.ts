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

  getActiveDorms(): Observable<string[]> {
    return of(['Reagan','Newlin']);
  }

  addBoarder(boarder: Boarder): Promise<void>{
    // create real uid and add
    console.log('Creating Boarder!');
    console.log(boarder);
    return new Promise(() => {return})
  }

  updateBoarder(boarder: Boarder): Promise<void> {
    console.log('Updating Boarder!');
    console.log(boarder);
    return new Promise(() => {return})
  }
}
