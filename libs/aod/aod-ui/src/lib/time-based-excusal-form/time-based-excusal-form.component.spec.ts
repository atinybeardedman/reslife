import { ChangeDetectionStrategy, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HarnessLoader, parallel } from '@angular/cdk/testing';
import { TimeBasedExcusalFormComponent } from './time-based-excusal-form.component';
import { TimeBasedExcusalFormModule } from './time-based-excusal-form.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldHarness } from '@angular/material/form-field/testing';
import { MatInputHarness } from '@angular/material/input/testing';
describe('TimeBasedExcusalFormComponent', () => {
  let component: TimeBasedExcusalFormComponent;
  let fixture: ComponentFixture<TimeBasedExcusalFormComponent>;
  let loader: HarnessLoader;

  beforeAll(() => {
    jest.useFakeTimers('modern');
    jest.setSystemTime(new Date(2021, 8, 1, 8, 0, 0, 0));
  });
  afterAll(() => {
    jest.useRealTimers();
  });
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TimeBasedExcusalFormComponent],
      imports: [TimeBasedExcusalFormModule, NoopAnimationsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .overrideComponent(TimeBasedExcusalFormComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeBasedExcusalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render depature and return time', async () => {
    const formFields = await loader.getAllHarnesses(MatFormFieldHarness);
    expect(formFields).toHaveLength(4);
    expect(await parallel(() => formFields.map((f) => f.getLabel()))).toEqual([
      'Departure Date *',
      'Departure Time *',
      'Return Date *',
      'Return Time *',
    ]);
    const inputs = await loader.getAllHarnesses(MatInputHarness);
    expect(await parallel(() => inputs.map((i) => i.getValue()))).toEqual([
      '9/1/2021',
      '08:00',
      '9/2/2021',
      '08:00',
    ]);
  });

  describe('When the form is valid', () => {
    it('should emit the leave and return time when any value changes', async () => {
      const spy = jest.spyOn(component.timing, 'emit');
      const returnTimeInput = await loader.getHarness(
        MatInputHarness.with({ value: '' })
      );
      await returnTimeInput.setValue('09:00');
      fixture.detectChanges();
      expect(spy).toHaveBeenLastCalledWith({
        leaveDate: '2021-09-01T12:00:00.000Z',
        returnDate: '2021-09-02T13:00:00.000Z',
      });
    });
  });

  describe('When the form is invalid', () => {
    it('Should emit null when the form value changes', async () => {
      const spy = jest.spyOn(component.timing, 'emit');
      const departureTimeInput = await loader.getHarness(
        MatInputHarness.with({ value: '08:00' })
      );
      await departureTimeInput.setValue('Bad Input');
      fixture.detectChanges();
      expect(spy).toHaveBeenLastCalledWith(null);
    });
  });
});
