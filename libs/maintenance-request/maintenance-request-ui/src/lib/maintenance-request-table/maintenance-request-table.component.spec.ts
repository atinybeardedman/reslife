import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceRequestTableComponent } from './maintenance-request-table.component';

describe('MaintenanceRequestTableComponent', () => {
  let component: MaintenanceRequestTableComponent;
  let fixture: ComponentFixture<MaintenanceRequestTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaintenanceRequestTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenanceRequestTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
