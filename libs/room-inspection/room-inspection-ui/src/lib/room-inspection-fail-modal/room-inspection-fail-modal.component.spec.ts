import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomInspectionFailModalComponent } from './room-inspection-fail-modal.component';

describe('RoomInspectionFailModalComponent', () => {
  let component: RoomInspectionFailModalComponent;
  let fixture: ComponentFixture<RoomInspectionFailModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomInspectionFailModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomInspectionFailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
