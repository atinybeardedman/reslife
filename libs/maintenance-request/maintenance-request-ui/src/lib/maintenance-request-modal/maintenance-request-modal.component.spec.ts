import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MaintenanceRequestModalComponent } from './maintenance-request-modal.component';
import {
  ChangeDetectionStrategy,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { MatFormFieldHarness } from '@angular/material/form-field/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import { MatSelectHarness } from '@angular/material/select/testing';
import { MatButtonHarness } from '@angular/material/button/testing';

import { MaintenanceRequestModalModule } from './maintenance-request-modal.module';
import { HarnessLoader, parallel } from '@angular/cdk/testing';
import {
  testRequest,
} from '@reslife/maintenance-request-model';
import { getDateString } from '@reslife/utils';
jest.mock('@reslife/utils', () => {
  return {
    getDateString: jest.fn(),
  };
});

const mockedGetDateString = getDateString as jest.MockedFunction<
  typeof getDateString
>;
describe('MaintenanceRequestModalComponent', () => {
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
  });
  let component: MaintenanceRequestModalComponent;
  let fixture: ComponentFixture<MaintenanceRequestModalComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, MaintenanceRequestModalModule],
      declarations: [MaintenanceRequestModalComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .overrideComponent(MaintenanceRequestModalComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenanceRequestModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('When empty', () => {
    it('should show the fields', async () => {
      const fields = await loader.getAllHarnesses(MatFormFieldHarness);
      expect(fields).toHaveLength(4);
      expect(await parallel(() => fields.map((f) => f.getLabel()))).toEqual([
        'Subject *',
        'Building  *',
        'Room',
        'Details *',
      ]);
    });
    it('should render the dorms for the select', async () => {
      component.dorms = ['Reagan', 'Newlin'];
      fixture.detectChanges();

      const select = await loader.getHarness(MatSelectHarness);
      await select.open();
      const options = await select.getOptions();
      expect(await parallel(() => options.map((o) => o.getText()))).toEqual([
        'Reagan',
        'Newlin',
        'Other',
      ]);
    });
  });

  describe('When data is entered', () => {
    let inputs: MatInputHarness[];
    let select: MatSelectHarness;
    beforeEach(async () => {
      component.dorms = ['Reagan', 'Newlin'];
      fixture.detectChanges();
      inputs = await loader.getAllHarnesses(MatInputHarness);
      select = await loader.getHarness(MatSelectHarness);
      const inputData = [
        testRequest.subject,
        testRequest.room as string,
        testRequest.request,
      ];
      inputs.forEach(async (input, i) => {
        await input.setValue(inputData[i]);
      });
      await select.open();
      await select.clickOptions({ text: testRequest.building });
    });
    it('should show the other building field only if other is chosen', async () => {
      
      // console.log(await loader.getAllHarnesses(MatFormFieldHarness))
      expect(await loader.getAllHarnesses(
        MatFormFieldHarness.with({ selector: '[data-testid="otherBuilding"]' })
        )).toHaveLength(0);
      
      await select.open();
      await select.clickOptions({ text: 'Other' });
        expect(await loader.getHarness(
          MatFormFieldHarness.with({ selector: '[data-testid="otherBuilding"]' })
          )).not.toBeNull();
    });

    it('should not allow saving unless form is valid', async () => {
      let button = await loader.getHarness(MatButtonHarness);
      expect(await button.isDisabled()).toBeFalsy();

      await inputs[0].setValue('');

      button = await loader.getHarness(MatButtonHarness);
      expect(await button.isDisabled()).toBeTruthy();
    });

    it('should emit the request on submit', async () => {
      mockedGetDateString.mockReturnValueOnce(testRequest.date);
      const saveSpy = jest.spyOn(component.saveRequest, 'emit');
      const button = await loader.getHarness(MatButtonHarness);
      await button.click();
      expect(saveSpy).toHaveBeenCalledWith(testRequest);
    });
  });
});
