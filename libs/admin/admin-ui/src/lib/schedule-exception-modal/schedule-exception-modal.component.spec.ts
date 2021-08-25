import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleExceptionModalComponent } from './schedule-exception-modal.component';

describe('ScheduleExceptionModalComponent', () => {
  let component: ScheduleExceptionModalComponent;
  let fixture: ComponentFixture<ScheduleExceptionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleExceptionModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleExceptionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when creating a new exception', () => {
    it('should display the datepicker and note fields');

    it('should load the current check-ins for the selected day');

    it('should not allow saving unless form is valid and at least one check-in exists');
  });

  describe('when editing a current exception', () => {
    it('should display the datepicker (disabled) and the note field');

    it('should fill the check-ins with the existing data');
  })
});
