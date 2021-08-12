import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomInspectionListComponent } from './room-inspection-list.component';

describe('RoomInspectionListComponent', () => {
  let component: RoomInspectionListComponent;
  let fixture: ComponentFixture<RoomInspectionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomInspectionListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomInspectionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
