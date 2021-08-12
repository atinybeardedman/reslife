import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RoomInspectionDataService } from '@reslife/room-inspection-data-access';
import { RoomInspectionUiModule } from '@reslife/room-inspection-ui';
import { MockModule, MockProvider } from 'ng-mocks';

import { RoomInspectionPageComponent } from './room-inspection-page.component';

describe('RoomInspectionPageComponent', () => {
  let component: RoomInspectionPageComponent;
  let fixture: ComponentFixture<RoomInspectionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MockModule(RoomInspectionUiModule),
      ],
      declarations: [ RoomInspectionPageComponent ],
      providers: [MockProvider(RoomInspectionDataService)],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
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
