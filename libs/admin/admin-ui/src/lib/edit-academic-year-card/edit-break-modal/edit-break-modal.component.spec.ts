import { HarnessLoader, parallel } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ChangeDetectionStrategy, SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatEndDateHarness, MatStartDateHarness } from '@angular/material/datepicker/testing';
import { MatFormFieldHarness } from '@angular/material/form-field/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NamedTimeSpan, testBreak } from '@reslife/admin-model';

import { EditBreakModalComponent } from './edit-break-modal.component';
import { EditBreakModalModule } from './edit-break-modal.module';

describe('EditBreakModalComponent', () => {
  let component: EditBreakModalComponent;
  let fixture: ComponentFixture<EditBreakModalComponent>;
  let loader: HarnessLoader;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditBreakModalModule, NoopAnimationsModule],
      declarations: [ EditBreakModalComponent ]
    })
    .overrideComponent(EditBreakModalComponent, {
      set: {
        changeDetection: ChangeDetectionStrategy.Default
      }
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBreakModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when editing a break', () => {
    beforeEach(() => {
      component.breakDoc = testBreak;
      component.ngOnChanges({
        breakDoc: new SimpleChange(null, testBreak, false)
      });
      fixture.detectChanges();
    })
    it('should fill the fields with the given data', async () => {
      const nameInput = await loader.getHarness(MatInputHarness);
      const startInput = await loader.getHarness(MatStartDateHarness);
      const endInput = await loader.getHarness(MatEndDateHarness);
      expect(await nameInput.getValue()).toBe(testBreak.name);
      expect(await startInput.getValue()).toBe('11/18/2020');
      expect(await endInput.getValue()).toBe('11/30/2020');
    });


    it('should emit the edited break when save is clicked', async () => {
      const spy = jest.spyOn(component.save, 'emit');
      const button = await loader.getHarness(MatButtonHarness.with({text: 'Save'}));
      await button.click();
      fixture.detectChanges();
      expect(spy).toHaveBeenCalledWith(testBreak);
    })
  });

  describe('when creating a new break', () => {
    it('should display the fields', async () => {
      const fields = await loader.getAllHarnesses(MatFormFieldHarness);
      expect(fields).toHaveLength(2);
      expect(await parallel(() => fields.map(f =>
        f.getLabel()))).toEqual([
          'Break Name *',
          'Enter a date range *'
        ])
    });

    it('should not allow saving unless the form is valid', async () => {
      const button = await loader.getHarness(MatButtonHarness.with({text: 'Save'}));
      expect(await button.isDisabled()).toBe(true);

      const nameInput = await loader.getHarness(MatInputHarness);
      const startInput = await loader.getHarness(MatStartDateHarness);
      const endInput = await loader.getHarness(MatEndDateHarness);

      await nameInput.setValue(testBreak.name);
      await startInput.setValue('11/18/2020');
      await endInput.setValue('11/30/2020');
      fixture.detectChanges();

      expect(await button.isDisabled()).toBe(false);
    });

    it('should emit the new break when save is clicked', async () => {
      const spy = jest.spyOn(component.save, 'emit');
      const button = await loader.getHarness(MatButtonHarness.with({text: 'Save'}));

      const nameInput = await loader.getHarness(MatInputHarness);
      const startInput = await loader.getHarness(MatStartDateHarness);
      const endInput = await loader.getHarness(MatEndDateHarness);

      await nameInput.setValue(testBreak.name);
      await startInput.setValue('11/18/20');
      await endInput.setValue('11/30/20');
      await button.click();
      fixture.detectChanges();
      const expected: NamedTimeSpan = {
        name: testBreak.name,
        start: '2020-11-18',
        end: '2020-11-30',
        uid: ''
      };
      expect(spy).toHaveBeenCalledWith(expected);
    })
  })
});
