import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffManagementTableComponent } from './staff-management-table.component';

describe('StaffManagementTableComponent', () => {
  let component: StaffManagementTableComponent;
  let fixture: ComponentFixture<StaffManagementTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffManagementTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffManagementTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
