import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DormNotesFormComponent } from './dorm-notes-form.component';

describe('DormNotesFormComponent', () => {
  let component: DormNotesFormComponent;
  let fixture: ComponentFixture<DormNotesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DormNotesFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DormNotesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
