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
});
