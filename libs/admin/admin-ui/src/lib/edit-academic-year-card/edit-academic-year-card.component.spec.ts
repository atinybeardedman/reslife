import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { BreakManagementTableModule } from './break-management-table/break-management-table.module';

import { EditAcademicYearCardComponent } from './edit-academic-year-card.component';
import { EditBreakModalModule } from './edit-break-modal/edit-break-modal.module';
import { ConfirmModalModule } from '../confirm-modal/confirm-modal.module';
import { ChangeDetectionStrategy, SimpleChange } from '@angular/core';
import { HarnessLoader, parallel } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatDialogModule } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { testAcademicYear, testBreak } from '@reslife/admin-model';
import { MatFormFieldHarness } from '@angular/material/form-field/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatStepHarness, MatStepperHarness, MatStepperNextHarness } from '@angular/material/stepper/testing';
describe('EditAcademicYearCardComponent', () => {
  let component: EditAcademicYearCardComponent;
  let fixture: ComponentFixture<EditAcademicYearCardComponent>;
  let loader: HarnessLoader;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatStepperModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatDialogModule,
        FormsModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
        BreakManagementTableModule,
        EditBreakModalModule,
        ConfirmModalModule,
      ],
      declarations: [EditAcademicYearCardComponent],
    })
      .overrideComponent(EditAcademicYearCardComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default,
        },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAcademicYearCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('the first step', () => {
    beforeEach(() => {
      component.yearDoc = testAcademicYear;
      component.breaks = [testBreak];
      component.ngOnChanges({
        yearDoc: new SimpleChange(null, testAcademicYear, false),
        breaks: new SimpleChange(null, [testBreak], false),
      });
      fixture.detectChanges();
    });
    it('should display the date fields', async () => {
      const fields = await loader.getAllHarnesses(MatFormFieldHarness);
      expect(fields).toHaveLength(2);
      expect(await parallel(() => fields.map((f) => f.getLabel()))).toEqual([
        'Start Date *',
        'End Date *',
      ]);
      const inputs = (await parallel(() =>
        fields.map((f) => f.getControl())
      )) as MatInputHarness[];
      expect(await parallel(() => inputs.map((i) => i.getValue()))).toEqual([
        '9/10/2020',
        '6/10/2021',
      ]);
    });
    it('should not allow the next step unless the dates are valid', async () => {
      const firstStep = await loader.getHarness(
        MatStepHarness
      );
      expect(await firstStep.hasErrors()).toBe(false);

      const input = await loader.getHarness(MatInputHarness);
      await input.setValue('');
      fixture.detectChanges();
      expect(await firstStep.isCompleted()).toBe(false);
    });
  });

  describe('saving', () => {
    beforeEach(() => {
      component.yearDoc = testAcademicYear;
      component.breaks = [testBreak];
      component.ngOnChanges({
        yearDoc: new SimpleChange(null, testAcademicYear, false),
        breaks: new SimpleChange(null, [testBreak], false),
      });
      fixture.detectChanges();
    })
    it('should allow saving if the first step is valid', async () => {
      const stepper = await loader.getHarness(MatStepperHarness);
      await stepper.selectStep({label: 'Save'});
      const button = await loader.getHarness(MatButtonHarness.with({text: 'Save'}));
      expect(await button.isDisabled()).toBe(false);
    });
    it('should emit the year and breaks on save', async () => {
      const spy = jest.spyOn(component.save, 'emit');
      const stepper = await loader.getHarness(MatStepperHarness);
      await stepper.selectStep({label: 'Save'});
      const button = await loader.getHarness(MatButtonHarness.with({text: 'Save'}));
      await button.click();
      fixture.detectChanges();
      expect(spy).toHaveBeenCalledWith({
        year: testAcademicYear,
        breaks: [testBreak]
      })
    });
  });
});
