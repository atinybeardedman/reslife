import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DormNotesPickerComponent } from './dorm-notes-picker.component';

describe('DormNotesPickerComponent', () => {
  let component: DormNotesPickerComponent;
  let fixture: ComponentFixture<DormNotesPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DormNotesPickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DormNotesPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
