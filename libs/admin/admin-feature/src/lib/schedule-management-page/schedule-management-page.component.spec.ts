import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleManagementPageComponent } from './schedule-management-page.component';

describe('ScheduleManagementPageComponent', () => {
  let component: ScheduleManagementPageComponent;
  let fixture: ComponentFixture<ScheduleManagementPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleManagementPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleManagementPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
