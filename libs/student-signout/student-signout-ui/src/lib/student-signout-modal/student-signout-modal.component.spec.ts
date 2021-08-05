import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentSignoutModalComponent } from './student-signout-modal.component';

describe('StudentSignoutModalComponent', () => {
  let component: StudentSignoutModalComponent;
  let fixture: ComponentFixture<StudentSignoutModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentSignoutModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentSignoutModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('before a student is selected',() => {
    // it('should only show the name picker');
    // it('should disable the signout button')
  })

  describe('When a not campused student is selected', () => {
    // it('should show the form');
    // it('should only show transportation methods the student has permissions for')
    // it('should show the which car field when car is selected')
    // it('should not allow signing out if the form is invalid')
  });

  describe('When a campused student is selected', () => {
    // it('should show they are campused instead of the form');

    // it('should disable the signout button');
  });

  describe('When editing a signout', () => {
    // it('should not allow the user to change the student');
    // it('should fill the fields with the given signout information');
  })
});
