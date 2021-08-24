import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegularScheduleAccordionComponent } from './regular-schedule-accordion.component';

describe('RegularScheduleAccordionComponent', () => {
  let component: RegularScheduleAccordionComponent;
  let fixture: ComponentFixture<RegularScheduleAccordionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegularScheduleAccordionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegularScheduleAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
