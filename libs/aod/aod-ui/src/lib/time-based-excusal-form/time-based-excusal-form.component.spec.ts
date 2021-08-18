import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeBasedExcusalFormComponent } from './time-based-excusal-form.component';

describe('TimeBasedExcusalFormComponent', () => {
  let component: TimeBasedExcusalFormComponent;
  let fixture: ComponentFixture<TimeBasedExcusalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeBasedExcusalFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeBasedExcusalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
