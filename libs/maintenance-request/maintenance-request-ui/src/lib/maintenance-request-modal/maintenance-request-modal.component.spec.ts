import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceRequestModalComponent } from './maintenance-request-modal.component';

describe('MaintenanceRequestModalComponent', () => {
  let component: MaintenanceRequestModalComponent;
  let fixture: ComponentFixture<MaintenanceRequestModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaintenanceRequestModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenanceRequestModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
