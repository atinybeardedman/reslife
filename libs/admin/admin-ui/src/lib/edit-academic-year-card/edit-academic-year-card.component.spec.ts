import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAcademicYearCardComponent } from './edit-academic-year-card.component';

describe('EditAcademicYearCardComponent', () => {
  let component: EditAcademicYearCardComponent;
  let fixture: ComponentFixture<EditAcademicYearCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAcademicYearCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAcademicYearCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
