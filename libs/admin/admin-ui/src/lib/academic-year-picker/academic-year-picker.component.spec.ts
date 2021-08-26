import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicYearPickerComponent } from './academic-year-picker.component';

describe('AcademicYearPickerComponent', () => {
  let component: AcademicYearPickerComponent;
  let fixture: ComponentFixture<AcademicYearPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcademicYearPickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcademicYearPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
