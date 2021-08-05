import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentSignoutPageComponent } from './student-signout-page.component';

describe('StudentSignoutPageComponent', () => {
  let component: StudentSignoutPageComponent;
  let fixture: ComponentFixture<StudentSignoutPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentSignoutPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentSignoutPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should display the current signouts')

  // it('should open the modal for a new signout')

  // it('should allow students to be signed in when selected from the table')
});
