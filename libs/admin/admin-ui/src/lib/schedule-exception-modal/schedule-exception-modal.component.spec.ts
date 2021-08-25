import { HarnessLoader, parallel } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ChangeDetectionStrategy, SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatFormFieldHarness } from '@angular/material/form-field/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { testBrunchScheduleItem, testDinnerScheduleItem, testExceptionDay } from '@reslife/admin-model';

import { ScheduleExceptionModalComponent } from './schedule-exception-modal.component';
import { ScheduleExceptionModalModule} from './schedule-exception-modal.module';

describe('ScheduleExceptionModalComponent', () => {
  let component: ScheduleExceptionModalComponent;
  let fixture: ComponentFixture<ScheduleExceptionModalComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScheduleExceptionModalModule, NoopAnimationsModule],
      declarations: [ ScheduleExceptionModalComponent ]
    })
    .overrideComponent(ScheduleExceptionModalComponent, {
      set: {
        changeDetection: ChangeDetectionStrategy.Default
      }
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleExceptionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when creating a new exception', () => {
    beforeEach(() => {
      component.regularSchedule = [
        testBrunchScheduleItem,
          testDinnerScheduleItem
      ];
      fixture.detectChanges();
    }) 
    it('should display the datepicker and note fields', async () => {
      const fields = await loader.getAllHarnesses(MatFormFieldHarness);
      expect(await parallel(() => fields.map(f => f.getLabel()))).toEqual(['Choose a date *', 'Type of Exception *'])
    });

    it('should load the current check-ins for the selected day', async () => {
     
      const dateInput = await loader.getHarness(MatInputHarness);
      await dateInput.setValue('9/12/2021');
      await dateInput.blur();
      const checkInFields = await loader.getAllHarnesses(MatFormFieldHarness.with({floatingLabelText: 'Check In Name *'}))
      expect(checkInFields).toHaveLength(2);
      const checkInInputs = await parallel(() => checkInFields.map(c => c.getControl())) as MatInputHarness[];
      expect(await parallel(() => checkInInputs.map(c => c.getValue()))).toEqual([
        testBrunchScheduleItem.name,
        testDinnerScheduleItem.name
      ])
    });

    it('should not allow saving unless form is valid and at least one check-in exists', async () => {
      const button = await loader.getHarness(MatButtonHarness.with({text: 'Save'}));
      expect(await button.isDisabled()).toBe(true);

      const [dateInput, noteInput] = await loader.getAllHarnesses(MatInputHarness);
      await dateInput.setValue('9/12/2021');
      await dateInput.blur();
      expect(await button.isDisabled()).toBe(true);

      await noteInput.setValue('No Brunch');
      await noteInput.blur();

      let xButton = await loader.getHarness(MatButtonHarness.with({text: 'close'}));
      await xButton.click();

      expect(await button.isDisabled()).toBe(false);

      xButton = await loader.getHarness(MatButtonHarness.with({text: 'close'}));
      await xButton.click();

      expect(await button.isDisabled()).toBe(true);
      
    });
  });

  describe('when editing a current exception', () => {
    
    beforeEach(() => {
      component.exception = testExceptionDay;
      component.ngOnChanges({
        exception: new SimpleChange(null, testExceptionDay, false)
      })
    });
    it('should display the datepicker (disabled) the note field, and existing check-ins', async () => {
      const [dateField, noteField, ...otherFields] = await loader.getAllHarnesses(MatFormFieldHarness);
      
      expect(await dateField.isDisabled()).toBe(true);
      const dateInput = await dateField.getControl() as MatInputHarness;
      expect(await dateInput.getValue()).toBe('9/10/2021');

      const noteInput = await noteField.getControl() as MatInputHarness;
      expect(await noteInput.getValue()).toBe(testExceptionDay.note);

      const otherInputs = await parallel(() => otherFields.map(o => o.getControl())) as MatInputHarness[];
      const checkIn = testExceptionDay.checkIns[0];
      expect(await parallel(() => otherInputs.map(o => o.getValue()))).toEqual([
        checkIn['check-in'],
        checkIn.startTime,
        checkIn.endTime
      ])
    });

   
  })
});
