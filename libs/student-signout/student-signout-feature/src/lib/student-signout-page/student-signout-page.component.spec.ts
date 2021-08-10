import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentSignoutPageComponent } from './student-signout-page.component';

import { StudentSignoutDataService } from '@reslife/student-signout-data-access';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { StudentSignoutUiModule } from '@reslife/student-signout-ui';
jest.mock('@reslife/student-signout-data-access');
describe('StudentSignoutPageComponent', () => {
  let component: StudentSignoutPageComponent;
  let fixture: ComponentFixture<StudentSignoutPageComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentSignoutUiModule],
      declarations: [StudentSignoutPageComponent],
      providers: [StudentSignoutDataService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentSignoutPageComponent);
    TestBed.inject(StudentSignoutDataService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
