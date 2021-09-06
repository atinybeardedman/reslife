import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AodSignoutDataService } from '@reslife/aod-data-access';
import { BoarderPermissions, NamedItem } from '@reslife/shared-models';
import { SearchSelectComponent } from '@reslife/shared/ui';
import { BoarderSignoutMeta, StudentSignout } from '@reslife/student-signout-model';
import { Observable } from 'rxjs';

@Component({
  selector: 'reslife-aod-signouts-page',
  templateUrl: './aod-signouts-page.component.html',
  styleUrls: ['./aod-signouts-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AodSignoutsPageComponent implements OnInit {
  signoutForm: FormGroup;
  selectedSignoutMeta!: BoarderSignoutMeta | null;
  signout!: StudentSignout | null;
  tempPermissions!: BoarderPermissions | null;
  boarders$!: Observable<BoarderSignoutMeta[]>;

  @ViewChild(SearchSelectComponent) searchSelect!: SearchSelectComponent;

  constructor(fb: FormBuilder, private asds: AodSignoutDataService) {
    this.signoutForm = fb.group({
      choice: ['one-time', Validators.required]
    });
   }
  
  get choice(): 'one-time' | 'weekend' {
    return this.signoutForm.controls.choice.value;
  }
  ngOnInit(): void {
    this.boarders$ = this.asds.getSignoutMetas();
  }

  selectBoarder(meta: NamedItem): void {
    this.selectedSignoutMeta = meta as BoarderSignoutMeta;
  }

  setSignout(signout: StudentSignout | null): void {
    this.signout = signout;
    this.tempPermissions = null;
  }

  setTempPermissions(permissions: BoarderPermissions | null): void {
    this.tempPermissions = permissions;
    this.signout = null;
  }

  get isValid(): boolean {
    if(this.selectedSignoutMeta && this.signoutForm.valid){
      if(this.choice === 'one-time'){
        return !!this.signout;
      } else {
        return !! this.tempPermissions;
      }
    }
    return false;
  }

  async save(){
    if(this.choice === 'one-time'){
      await this.asds.addSignout(this.signout as StudentSignout);
    } else {
      if(this.selectedSignoutMeta && this.tempPermissions){
        await this.asds.addOverride(this.selectedSignoutMeta, this.tempPermissions )
      }
    }
    this.signoutForm.reset();
    this.searchSelect.clear();
    this.selectedSignoutMeta = null;
    this.setSignout(null);
    this.setTempPermissions(null);
  }

}
