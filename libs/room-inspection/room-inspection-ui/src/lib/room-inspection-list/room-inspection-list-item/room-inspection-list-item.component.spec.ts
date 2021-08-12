import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HarnessLoader, parallel } from '@angular/cdk/testing';
import { RoomInspectionListItemComponent } from './room-inspection-list-item.component';
import {
  pendingInspectionDoc,
  passedInspectionDoc,
  failedInspectionDoc,
} from '@reslife/room-inspection-model';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonHarness } from '@angular/material/button/testing';
import {  MatIconModule } from '@angular/material/icon';
import { MatIconHarness } from '@angular/material/icon/testing';
import { By } from '@angular/platform-browser';
describe('RoomInspectionListItemComponent', () => {
  let component: RoomInspectionListItemComponent;
  let fixture: ComponentFixture<RoomInspectionListItemComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatButtonModule, MatIconModule],
      declarations: [RoomInspectionListItemComponent],
    })
      .overrideComponent(RoomInspectionListItemComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomInspectionListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('For students to be inspected', () => {
    beforeEach(() => {
      component.inspectionDoc = pendingInspectionDoc;
      fixture.detectChanges();
    });
    it('should render the student name and pass/fail buttons', async () => {
      expect(
        fixture.debugElement.query(By.css('.name')).nativeElement.textContent
      ).toBe(pendingInspectionDoc.name);
      const buttons = await loader.getAllHarnesses(MatButtonHarness);
      expect(buttons).toHaveLength(2);
      expect(await parallel(() => buttons.map((b) => b.getText()))).toEqual([
        'thumb_up',
        'thumb_down',
      ]);
    });
    it('should emit the inspection with appropriate result when buttons are pressed', async () => {
      const spy = jest.spyOn(component.inspection, 'emit');
      const buttons = await loader.getAllHarnesses(MatButtonHarness);
      await buttons[0].click();
      fixture.detectChanges();
      expect(spy).toHaveBeenCalledWith(passedInspectionDoc);

      await buttons[1].click();
      fixture.detectChanges();
      expect(spy).toHaveBeenCalledWith(failedInspectionDoc);
    });
  });

  describe('For students already inspected', () => {
    beforeEach(() => {
      component.inspectionDoc = failedInspectionDoc;
      fixture.detectChanges();
    })
    it('should render the student name, inspection result, and flip button', async () => {
      expect(
        fixture.debugElement.query(By.css('.name')).nativeElement.textContent
      ).toBe(pendingInspectionDoc.name);

      const resultIcon = await loader.getHarness(MatIconHarness);
      expect(await resultIcon.getName()).toBe('thumb_down');
      const button = await loader.getHarness(MatButtonHarness);
      expect(await button.getText()).toBe('swap_horiz');
    });

    it('should emit the inspection with a flipped result when the button is clicked', async () => {
      const spy = jest.spyOn(component.inspection, 'emit');
      const button = await loader.getHarness(MatButtonHarness);
      await button.click();
      fixture.detectChanges();

      expect(spy).toHaveBeenLastCalledWith(passedInspectionDoc);

    });
  });
});
