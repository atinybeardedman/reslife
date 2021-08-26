import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetUpYearPageComponent } from './set-up-year-page.component';

describe('SetUpYearPageComponent', () => {
  let component: SetUpYearPageComponent;
  let fixture: ComponentFixture<SetUpYearPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetUpYearPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetUpYearPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
