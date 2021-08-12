import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomInspectionPageComponent } from './room-inspection-page.component';

describe('RoomInspectionPageComponent', () => {
  let component: RoomInspectionPageComponent;
  let fixture: ComponentFixture<RoomInspectionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomInspectionPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomInspectionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
