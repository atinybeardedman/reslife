import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegularScheduleModalComponent } from './regular-schedule-modal.component';

describe('RegularScheduleModalComponent', () => {
  let component: RegularScheduleModalComponent;
  let fixture: ComponentFixture<RegularScheduleModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegularScheduleModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegularScheduleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
