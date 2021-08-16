import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DormNotesPageComponent } from './dorm-notes-page.component';

describe('DormNotesPageComponent', () => {
  let component: DormNotesPageComponent;
  let fixture: ComponentFixture<DormNotesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DormNotesPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DormNotesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('on initial load', () => {
    it('should display the picker');

    it('should display the notes');
  })
});
