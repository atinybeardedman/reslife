import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DormNotesFieldComponent } from './dorm-notes-field.component';

describe('DormNotesFieldComponent', () => {
  let component: DormNotesFieldComponent;
  let fixture: ComponentFixture<DormNotesFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DormNotesFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DormNotesFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
