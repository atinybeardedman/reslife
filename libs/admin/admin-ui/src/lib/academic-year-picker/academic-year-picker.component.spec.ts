import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatSelectHarness } from '@angular/material/select/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AcademicYear, testAcademicYear } from '@reslife/admin-model';
import { getAcademicYear, incrementAcademicYear } from '@reslife/utils';

import { AcademicYearPickerComponent } from './academic-year-picker.component';
import { AcademicYearPickerModule } from './academic-year-picker.module';

describe('AcademicYearPickerComponent', () => {
  let component: AcademicYearPickerComponent;
  let fixture: ComponentFixture<AcademicYearPickerComponent>;
  let loader: HarnessLoader;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcademicYearPickerModule, NoopAnimationsModule],
      declarations: [ AcademicYearPickerComponent ]
    })
    .overrideComponent(AcademicYearPickerComponent, {
      set: {
        changeDetection: ChangeDetectionStrategy.Default
      }
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcademicYearPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('When years exist', () => {
    beforeEach(() => {
      component.yearDocs = [
        testAcademicYear
      ];
      fixture.detectChanges();
    })
    it('should display the current academic years given', async () => {
      const select = await loader.getHarness(MatSelectHarness);
      await select.open();
      const options = await select.getOptions(); 
      expect(options).toHaveLength(1);
      expect(await options[0].getText()).toBe(testAcademicYear.name);
    });
    it('should emit the chosen academic year', async () => {
      const spy = jest.spyOn(component.yearSelected, 'emit');
      const select = await loader.getHarness(MatSelectHarness);
      await select.open();
      await select.clickOptions({text: testAcademicYear.name});
      fixture.detectChanges();
      expect(spy).toHaveBeenCalledWith(testAcademicYear);
    });
    it('should add an academic year when the button is clicked', async () => {
      const button = await loader.getHarness(MatButtonHarness);
      await button.click();
      fixture.detectChanges();
      const select = await loader.getHarness(MatSelectHarness);

      expect(await select.getValueText()).toBe(incrementAcademicYear(testAcademicYear.name));
    })
  });

  describe('when no years exist', () => {
    it('should have a disabled select', async () => {
      const select = await loader.getHarness(MatSelectHarness);
      expect(await select.isDisabled()).toBe(true);
    });

    it('should add the current year when the button is clicked', async () => {
      const button = await loader.getHarness(MatButtonHarness);
      await button.click();
      fixture.detectChanges();
      const select = await loader.getHarness(MatSelectHarness);

      expect(await select.getValueText()).toBe(getAcademicYear());
    });

    it('should emit a blank academic year doc when the button is clicked', async () => {
      const spy = jest.spyOn(component.yearSelected, 'emit');
      const button = await loader.getHarness(MatButtonHarness);
      await button.click();
      fixture.detectChanges();
      
      const expectedDoc: AcademicYear = {
        name: getAcademicYear(),
        uid: getAcademicYear(),
        start: '',
        end: '',
        breaks: []
      };
      expect(spy).toHaveBeenCalledWith(expectedDoc);
    })
  })


});
