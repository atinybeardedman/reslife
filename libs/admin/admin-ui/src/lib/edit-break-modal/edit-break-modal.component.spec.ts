import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBreakModalComponent } from './edit-break-modal.component';

describe('EditBreakModalComponent', () => {
  let component: EditBreakModalComponent;
  let fixture: ComponentFixture<EditBreakModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditBreakModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBreakModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
