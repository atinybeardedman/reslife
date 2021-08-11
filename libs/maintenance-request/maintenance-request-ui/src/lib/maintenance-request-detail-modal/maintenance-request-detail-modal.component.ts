import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { MaintenanceRequestDoc } from '@reslife/maintenance-request-model';

@Component({
  selector: 'reslife-maintenance-request-detail-modal',
  templateUrl: './maintenance-request-detail-modal.component.html',
  styleUrls: ['./maintenance-request-detail-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MaintenanceRequestDetailModalComponent {

  @Input() request!: MaintenanceRequestDoc;

}
