import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleExceptionsTableComponent } from './schedule-exceptions-table.component';

describe('ScheduleExceptionsTableComponent', () => {
  let component: ScheduleExceptionsTableComponent;
  let fixture: ComponentFixture<ScheduleExceptionsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleExceptionsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleExceptionsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
