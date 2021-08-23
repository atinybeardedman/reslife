import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffManagementModalComponent } from './staff-management-modal.component';

describe('StaffManagementModalComponent', () => {
  let component: StaffManagementModalComponent;
  let fixture: ComponentFixture<StaffManagementModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffManagementModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffManagementModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
