import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HarnessLoader, parallel } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';

import { StayStepperComponent } from './stay-stepper.component';
import { StayStepperModule } from './stay-stepper.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatStepperHarness } from '@angular/material/stepper/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
describe('StayStepperComponent', () => {
  let component: StayStepperComponent;
  let fixture: ComponentFixture<StayStepperComponent>;
  let loader: HarnessLoader;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StayStepperModule, NoopAnimationsModule],
      declarations: [ StayStepperComponent ]
    })
    .overrideComponent(StayStepperComponent, {
      set: {
        changeDetection: ChangeDetectionStrategy.Default
      }
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StayStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the reason, where, and confirm steps', async () => {
    const stepper = await loader.getHarness(MatStepperHarness);
    const steps = await stepper.getSteps();
    expect(await parallel(() => steps.map(s => s.getLabel()))).toEqual([
      'Reason',
      'When',
      'Confirm'
    ]);
  });

  it('should emit the leave request on save', async () => {
    const spy = jest.spyOn(component.save, 'emit');
    const controls = await loader.getAllHarnesses(MatInputHarness);
    const startDate = '2021-09-11T17:00:00.000Z';
    const endDate = '2021-09-12T15:30:00.000Z';
    const values = [
      'Parents are out of town',
      '9/11/21',
      new Date(startDate).getHours() + ':00',
      '9/12/21',
      new Date(endDate).getHours() + ':30'
    ];
    await parallel(() => controls.map((c, i) => c.setValue(values[i])));
    const stepper = await loader.getHarness(MatStepperHarness);
    await stepper.selectStep({label: 'Confirm'});
    const submit = await loader.getHarness(MatButtonHarness.with({text: 'Submit'}));
    await submit.click();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith({
      reason: values[0],
      uid: '',
      email: '',
      startDate: '2021-09-11T17:00:00.000Z',
      endDate: '2021-09-12T15:30:00.000Z'
    })
  });
});
