import { HarnessLoader, parallel } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatStepHarness, MatStepperHarness } from '@angular/material/stepper/testing';
import { MatFormFieldHarness } from '@angular/material/form-field/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { LeaveStepperComponent } from './leave-stepper.component';
import { LeaveStepperModule } from './leave-stepper.module';
import { MatSelectHarness } from '@angular/material/select/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
describe('LeaveStepperComponent', () => {
  let component: LeaveStepperComponent;
  let fixture: ComponentFixture<LeaveStepperComponent>;
  let loader: HarnessLoader;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[NoopAnimationsModule, LeaveStepperModule],
      declarations: [LeaveStepperComponent],
    })
    .overrideComponent(LeaveStepperComponent, {
      set: {
        changeDetection: ChangeDetectionStrategy.Default
      }
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the where, when, and confirm steps', async () => {
    const stepper = await loader.getHarness(MatStepperHarness);
    const steps = await stepper.getSteps();
    expect(await parallel(() => steps.map(s => s.getLabel()))).toEqual([
      'Where',
      'When',
      'Confirm'
    ]);
  });

  describe('the where step', () => {
    let whereStep: MatStepHarness;
    beforeEach(async () => {
      whereStep = await loader.getHarness(MatStepHarness.with({label: 'Where'}));
    })
    it('should show the where field and transport select', async () => {
      
      const fields = await whereStep.getAllHarnesses(MatFormFieldHarness);
      expect(fields).toHaveLength(2);
      expect(await parallel(() => fields.map(f => f.getLabel()))).toEqual([
        'Where *',
        'Transport *',
      ])
    });

    it('should show the required other transport control when "other" is selected', async () => {
      let otherField = await loader.getAllHarnesses(MatFormFieldHarness.with({floatingLabelText: 'Other Transport *'}));
      expect(otherField).toHaveLength(0);
      const transport = await loader.getHarness(MatSelectHarness);
      await transport.open();
      await transport.clickOptions({text: 'Other (please specify)'});
      fixture.detectChanges();
      otherField = await loader.getAllHarnesses(MatFormFieldHarness.with({floatingLabelText: 'Other Transport *'}));
      expect(otherField).toHaveLength(1);
     
    })
  });

  it('should emit the leave request on save', async () => {
    const spy = jest.spyOn(component.save, 'emit');
    const where = [
      'College Visit',
      'Parent/Guardian'
    ];
    const dates = [
      '9/11/21',
      '17:00',
      '9/12/21',
      '15:30'
    ];
    const whereCtrl = await loader.getHarness(MatInputHarness);
    await whereCtrl.setValue(where[0]);
    const transportCtrl = await loader.getHarness(MatSelectHarness);
    await transportCtrl.open();
    await transportCtrl.clickOptions({text: where[1]});

    const whenStep = await loader.getHarness(MatStepHarness.with({label: 'When'}));
    const controls = await whenStep.getAllHarnesses(MatInputHarness);
    await parallel(() => controls.map((c, i) => c.setValue(dates[i])));

    const stepper = await loader.getHarness(MatStepperHarness);
    await stepper.selectStep({label: 'Confirm'});
    const submit = await loader.getHarness(MatButtonHarness.with({text: 'Submit'}));
    await submit.click();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith({    
      uid: '',
      email: '',
      where: where[0],
      transport: where[1],
      startDate: '2021-09-11T21:00:00.000Z',
      endDate: '2021-09-12T19:30:00.000Z'
    });
  });
});
