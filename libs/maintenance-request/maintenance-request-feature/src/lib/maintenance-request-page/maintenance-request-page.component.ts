import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MaintenanceRequestDataService } from '@reslife/maintenance-request-data-access';
import { MaintenanceRequestDoc } from '@reslife/maintenance-request-model'
import { Observable } from 'rxjs';
@Component({
  selector: 'reslife-maintenance-request-page',
  templateUrl: './maintenance-request-page.component.html',
  styleUrls: ['./maintenance-request-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MaintenanceRequestPageComponent implements OnInit {
  requests$!: Observable<MaintenanceRequestDoc[]>;
  constructor(private mds: MaintenanceRequestDataService) { }

  ngOnInit(): void {
    this.requests$ = this.mds.getRequests();
  }

}
