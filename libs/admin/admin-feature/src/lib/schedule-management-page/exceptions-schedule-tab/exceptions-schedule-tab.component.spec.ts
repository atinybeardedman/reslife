import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExceptionsScheduleTabComponent } from './exceptions-schedule-tab.component';

describe('ExceptionsScheduleTabComponent', () => {
  let component: ExceptionsScheduleTabComponent;
  let fixture: ComponentFixture<ExceptionsScheduleTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExceptionsScheduleTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExceptionsScheduleTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
