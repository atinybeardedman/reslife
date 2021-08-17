import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';


import { HarnessLoader, parallel } from '@angular/cdk/testing';
import { ChangeDetectionStrategy, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { DormDatePickerComponent } from './dorm-date-picker.component';
import { DormDatePickerModule } from './dorm-date-picker.module'
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MatDatepickerInputHarness } from '@angular/material/datepicker/testing';
import { MatSelectHarness } from '@angular/material/select/testing';

describe('DormDatePickerComponent', () => {
  let component: DormDatePickerComponent;
  let fixture: ComponentFixture<DormDatePickerComponent>;
  let loader: HarnessLoader;

  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        // addListener: jest.fn(), // deprecated
        // removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  })


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        DormDatePickerModule
      ],
      declarations: [ DormDatePickerComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .overrideComponent(DormDatePickerComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default },
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DormDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the select and datepicker', async () => {
    const dateInputs = await loader.getAllHarnesses(MatDatepickerInputHarness);
    expect(dateInputs).toHaveLength(1);
    const selects = await loader.getAllHarnesses(MatSelectHarness);
    expect(selects).toHaveLength(1);
  }
  );

  it('should automatically select the current date', async () => {
    const input = await loader.getHarness(MatDatepickerInputHarness);
    const today = new Date().toLocaleDateString('en-US');
    const date = await input.getValue();
    expect(today).toEqual(date);
  });

  it('should render the dorms passed via input', async () => {
    component.dorms = ['Reagan', 'Newlin'];
    fixture.detectChanges();
    const select = await loader.getHarness(MatSelectHarness);
    await select.open();
    const options = await select.getOptions();
    expect(await parallel(() => options.map(o => o.getText()))).toEqual(component.dorms);
  });

  it('should emit both the chosen dorm and date when either change', async () => {
    const spy = jest.spyOn(component.choiceSelected, 'emit');
    component.dorms = ['Reagan', 'Newlin'];
    fixture.detectChanges();


    const input = await loader.getHarness(MatDatepickerInputHarness);
    await input.setValue('9/13/2021');
    fixture.detectChanges();
    expect(spy).not.toHaveBeenCalled();

    const select = await loader.getHarness(MatSelectHarness);
    await select.open();
    await select.clickOptions({text: 'Reagan'});
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith({
      date: '2021-09-13',
      dorm: 'Reagan'
    })

    await input.setValue('9/14/2021');
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith({
      date: '2021-09-14',
      dorm: 'Reagan'
    })
  });
});
