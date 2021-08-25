import { HarnessLoader, parallel } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ChangeDetectionStrategy, SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatCheckboxHarness } from '@angular/material/checkbox/testing';
import { MatFormFieldHarness } from '@angular/material/form-field/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DAYNAMES, ScheduleItem, testBrunchScheduleItem } from '@reslife/admin-model';

import { RegularScheduleModalComponent } from './regular-schedule-modal.component';
import { RegularScheduleModalModule } from './regular-schedule-modal.module';

describe('RegularScheduleModalComponent', () => {
  let component: RegularScheduleModalComponent;
  let fixture: ComponentFixture<RegularScheduleModalComponent>;
  let loader: HarnessLoader;

  


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        RegularScheduleModalModule
      ],
      declarations: [ RegularScheduleModalComponent ]
    })
    .overrideComponent(RegularScheduleModalComponent, {
      set: {
        changeDetection: ChangeDetectionStrategy.Default
      }
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegularScheduleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('When creating a new check-in', () => {
    let fields: MatFormFieldHarness[];
    let checkboxes: MatCheckboxHarness[];
    beforeEach(async () => {
      fields = await loader.getAllHarnesses(MatFormFieldHarness);
      checkboxes = await loader.getAllHarnesses(MatCheckboxHarness);
    });
    it('should display the name, start and end fields and checkboxes for each day', async () => {
      expect(fields).toHaveLength(3);
      expect(await parallel(() => fields.map(f => f.getLabel()))).toEqual([
        'Check In Name *',
        'Start Time *',
        'End Time *',
      ]);
      expect(checkboxes).toHaveLength(7);
      expect(await parallel(() => checkboxes.map(c => c.getLabelText()))).toEqual(DAYNAMES);
    });

    it('should not allow saving if the form is invalid', async () => {
      const button = await loader.getHarness(MatButtonHarness);
      expect(await button.isDisabled()).toBe(true);

      const [nameCtrl, startCtrl, endCtrl] = await parallel(() => fields.map(f => f.getControl())) as MatInputHarness[];
      await nameCtrl.setValue('Dinner');
      await startCtrl.setValue('17:30');
      await endCtrl.setValue('18:15');
      expect(await button.isDisabled()).toBe(true);

      await checkboxes[0].check();
      expect(await button.isDisabled()).toBe(false);
    });

    it('should emit the new item on save', async () => {
      const spy = jest.spyOn(component.save, 'emit');

      const expectedItem: ScheduleItem = {
        ...testBrunchScheduleItem,
        uid: '',
        academicYear: component.academicYear as string
      };

      const [nameCtrl, startCtrl, endCtrl] = await parallel(() => fields.map(f => f.getControl())) as MatInputHarness[];
      await nameCtrl.setValue(expectedItem.name);
      await startCtrl.setValue(expectedItem.startTime);
      await endCtrl.setValue(expectedItem.endTime);

      for(const dayNum of expectedItem.days){
        await checkboxes[dayNum].check();
      }
      const button = await loader.getHarness(MatButtonHarness);
      await button.click();
      fixture.detectChanges();

     
      expect(spy).toHaveBeenCalledWith(expectedItem);

    })

  });

  describe('When editing an existing check-in', () => {
    let fields: MatFormFieldHarness[];
    let checkboxes: MatCheckboxHarness[];
    beforeEach(async () => {
      component.scheduleItem = testBrunchScheduleItem;
      component.title = 'Edit Check In';
      component.academicYear = testBrunchScheduleItem.academicYear;
      // fixture.detectChanges();
      component.ngOnChanges({
        scheduleItem: new SimpleChange(null, testBrunchScheduleItem, false),
        title: new SimpleChange(null, 'Edit Check In', false),
        academicYear: new SimpleChange(null, testBrunchScheduleItem.academicYear, false),
      });
       fields = await loader.getAllHarnesses(MatFormFieldHarness);
      checkboxes = await loader.getAllHarnesses(MatCheckboxHarness);
    })
    it('should fill the fields with the data given', async () => {
      const inputs = await parallel(() => fields.map(f => f.getControl())) as MatInputHarness[];
      expect(await parallel(() => inputs.map(i => i.getValue()))).toEqual([
        testBrunchScheduleItem.name,
        testBrunchScheduleItem.startTime,
        testBrunchScheduleItem.endTime
      ]);
      for(const [index, checkbox] of checkboxes.entries()){
          expect(await checkbox.isChecked()).toBe(testBrunchScheduleItem.days.includes(index));
      }
    });

    it('should emit the check-in on save', async () => {
      
      const spy = jest.spyOn(component.save, 'emit');

    
      const button = await loader.getHarness(MatButtonHarness);
      await button.click();
      fixture.detectChanges();

     
      expect(spy).toHaveBeenCalledWith(testBrunchScheduleItem);
    });
  })
});
