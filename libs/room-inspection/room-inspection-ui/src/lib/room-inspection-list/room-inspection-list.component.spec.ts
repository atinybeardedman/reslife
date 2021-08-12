import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';

import { ChangeDetectionStrategy } from '@angular/core';
import { pendingInspectionDoc } from '@reslife/room-inspection-model';
import { HarnessLoader } from '@angular/cdk/testing';

import { MatListHarness } from '@angular/material/list/testing';
import { RoomInspectionListComponent } from './room-inspection-list.component';
import { MockComponent } from 'ng-mocks';
import { RoomInspectionListItemComponent } from './room-inspection-list-item/room-inspection-list-item.component';
import { RoomInspectionListModule } from './room-inspection-list.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('RoomInspectionListComponent', () => {
  let component: RoomInspectionListComponent;
  let fixture: ComponentFixture<RoomInspectionListComponent>;
  let loader: HarnessLoader;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RoomInspectionListModule,
        NoopAnimationsModule
      ],
      declarations: [ RoomInspectionListComponent, MockComponent(RoomInspectionListItemComponent) ]
    })
    .overrideComponent(RoomInspectionListComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default },
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomInspectionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when there are docs', () =>{
    beforeEach(() => {
      component.title = 'To Inspect';
      component.inspectionDocs = [
        pendingInspectionDoc,
        pendingInspectionDoc,
        pendingInspectionDoc
      ];
      fixture.detectChanges();
    })
    it('should render the title', () => {
      expect(fixture.debugElement.query(By.css('.title')).nativeElement.textContent).toContain(component.title);
    });
    it('should render the count of items', () => {
      expect(fixture.debugElement.query(By.css('.count')).nativeElement.textContent).toContain('' + component.inspectionDocs?.length);
    });
    it('should render a list of mat-list-items', async () => {
      const matlist = await loader.getHarness(MatListHarness);
      expect(await matlist.getItems()).toHaveLength(component.inspectionDocs?.length as number)
    });
  })



});
