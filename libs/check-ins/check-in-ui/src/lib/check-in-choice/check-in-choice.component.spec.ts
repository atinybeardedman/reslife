import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { CheckInChoiceComponent } from './check-in-choice.component';

import { HarnessLoader } from '@angular/cdk/testing';
import { ChangeDetectionStrategy, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { MatDatepickerInputHarness } from '@angular/material/datepicker/testing';
import { MatSelectHarness } from '@angular/material/select/testing';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
describe('CheckInChoiceComponent', () => {
  let component: CheckInChoiceComponent;
  let fixture: ComponentFixture<CheckInChoiceComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatInputModule,
        MatSelectModule,
        MatNativeDateModule,
        NoopAnimationsModule
      ],
      declarations: [ CheckInChoiceComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .overrideComponent(CheckInChoiceComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default },
    })
    .compileComponents();
    fixture = TestBed.createComponent(CheckInChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('the interface', () => {
    let input: MatDatepickerInputHarness;
    beforeEach(async () => {
      input = await loader.getHarness(MatDatepickerInputHarness);
    });
  it('should initally set the date to today', async () => {
    const today = new Date().toLocaleDateString('en-US');
    const date = await input.getValue();
    expect(today).toEqual(date);
  });

})

  describe('Outputs', () => {
    it('should emit a date when selected from the datepicker', async() => {
      const spy = jest.spyOn(component.dateSelected, 'emit');
      const input = await loader.getHarness(MatDatepickerInputHarness);
      await input.setValue('9/13/2021');
      fixture.detectChanges();
      expect(spy).toHaveBeenCalledWith('2021-09-13');
    });
    it('should emit a check-in name when selected from the options', async () => {
      const spy = jest.spyOn(component.checkInSelected, 'emit');
      component.checkIns = ['Brunch', 'Dinner'];
      const select = await loader.getHarness(MatSelectHarness);
      await select.open();
      const options = await select.getOptions();
      
      await options[1].click();
      fixture.detectChanges();
      expect(spy).toHaveBeenCalledWith('Dinner');
    });
  });

  describe('Inputs', () => {
    let select: MatSelectHarness;
    beforeEach(async () => {
      select = await loader.getHarness(MatSelectHarness);
      await select.close();
    })
    it('should render the check-in options in the select', async () => {
      component.checkIns = ['Brunch', 'Dinner'];
      fixture.detectChanges();
      await select.open();
      const options = await select.getOptions();
      expect(await options[0].getText()).toBe('Brunch');
      expect(await options[1].getText()).toBe('Dinner');
    });
    it('should disable the select if there are no options', async () => {
      component.checkIns = [];
      fixture.detectChanges();
      expect(await select.isDisabled());
      expect(await select.isEmpty());
    });
  });

});
