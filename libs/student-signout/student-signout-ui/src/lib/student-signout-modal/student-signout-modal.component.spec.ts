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
});
