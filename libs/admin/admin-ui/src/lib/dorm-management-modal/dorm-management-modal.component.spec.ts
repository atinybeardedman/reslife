import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ChangeDetectionStrategy, SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import { MatCheckboxHarness } from '@angular/material/checkbox/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { DormManagementModalComponent } from './dorm-management-modal.component';
import { DormManagementModalModule } from './dorm-management-modal.module';
import { MatButtonHarness } from '@angular/material/button/testing';

describe('DormManagementModalComponent', () => {
  let component: DormManagementModalComponent;
  let fixture: ComponentFixture<DormManagementModalComponent>;
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
        DormManagementModalModule
      ],
      declarations: [ DormManagementModalComponent ]
    })
    .overrideComponent(DormManagementModalComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default },
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DormManagementModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('When creating a new dorm', () => {
    it('should show an empty, enabled text field and checkbox', async () => {
      const input = await loader.getHarness(MatInputHarness);
      const checkbox = await loader.getHarness(MatCheckboxHarness);
      expect(await input.getValue()).toBe('');
      expect(await input.isDisabled()).toBeFalsy();

      expect(await checkbox.isChecked()).toBeFalsy();
    });
    it('should only allow saving if the textfield is valid', async () => {
      const input = await loader.getHarness(MatInputHarness);
      const saveButton = await loader.getHarness(MatButtonHarness);
      expect(await saveButton.isDisabled()).toBeTruthy();

      await input.setValue('Taylor');
      fixture.detectChanges();
      expect(await saveButton.isDisabled()).toBeFalsy();
    });

  });

  describe('When editing a current dorm', () => {
    beforeEach(() =>{
      component.dorm  = {
        name: 'Reagan',
        isActive: true,
        uid: '1'
      };
      component.title = 'Edit Dorm';
      component.ngOnChanges({
        dorm: new SimpleChange(null, component.dorm, false)
      });
    })
    it('should show a filled, disabled textfield and a checkbox', async () => {
      const input = await loader.getHarness(MatInputHarness);
      const checkbox = await loader.getHarness(MatCheckboxHarness);

      expect(await input.getValue()).toBe(component?.dorm?.name);
      expect(await input.isDisabled()).toBeTruthy();
      expect(await checkbox.isChecked()).toBeTruthy();
    });
  })
});
