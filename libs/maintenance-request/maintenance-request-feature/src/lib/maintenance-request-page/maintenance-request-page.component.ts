import { Component, OnInit, ChangeDetectionStrategy, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MaintenanceRequestDataService } from '@reslife/maintenance-request-data-access';
import {  MaintenanceRequest, MaintenanceRequestDoc } from '@reslife/maintenance-request-model'
import { MaintenanceRequestDetailModalComponent, MaintenanceRequestModalComponent } from '@reslife/maintenance-request-ui';
import { Observable } from 'rxjs';
@Component({
  selector: 'reslife-maintenance-request-page',
  templateUrl: './maintenance-request-page.component.html',
  styleUrls: ['./maintenance-request-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MaintenanceRequestPageComponent implements OnInit {
  requests$!: Observable<MaintenanceRequestDoc[]>;
  dorms$!: Observable<string[]>;
  selectedRequest!: MaintenanceRequestDoc; 
  @ViewChild('detail') detailDialogTemplate!: TemplateRef<MaintenanceRequestDetailModalComponent>;
  @ViewChild('new') requestDialogTemplate!: TemplateRef<MaintenanceRequestModalComponent>;

  constructor(private mds: MaintenanceRequestDataService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.requests$ = this.mds.getRequests();
    this.dorms$ = this.mds.getActiveDorms();
  }

  openDetail(request: MaintenanceRequestDoc): void {
    this.selectedRequest = request;
    this.dialog.open(this.detailDialogTemplate, {
      id: 'detail'
    });
  }

  newRequest(): void {
    this.dialog.open(this.requestDialogTemplate, {
      width: '30rem',
      maxWidth: '90vw',
      id: 'newRequest'
    });
  }

  save(request: MaintenanceRequest): void {
    this.dialog.getDialogById('newRequest')?.close();
    this.mds.addRequest(request);
  }

}
