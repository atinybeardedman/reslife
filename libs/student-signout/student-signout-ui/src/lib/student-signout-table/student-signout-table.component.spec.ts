import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentSignoutTableComponent } from './student-signout-table.component';

describe('StudentSignoutTableComponent', () => {
  let component: StudentSignoutTableComponent;
  let fixture: ComponentFixture<StudentSignoutTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentSignoutTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentSignoutTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
