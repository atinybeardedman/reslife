import { HarnessLoader, parallel } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import {
  ChangeDetectionStrategy,
  CUSTOM_ELEMENTS_SCHEMA,
  SimpleChange,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatCheckboxHarness } from '@angular/material/checkbox/testing';
import { MatFormFieldHarness } from '@angular/material/form-field/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { testAod } from '@reslife/admin-model';

import { StaffManagementModalComponent } from './staff-management-modal.component';
import { StaffManagementModalModule } from './staff-management-modal.module';

describe('StaffManagementModalComponent', () => {
  let component: StaffManagementModalComponent;
  let fixture: ComponentFixture<StaffManagementModalComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StaffManagementModalModule, NoopAnimationsModule],
      declarations: [StaffManagementModalComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .overrideComponent(StaffManagementModalComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffManagementModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when creating a new staff member', () => {
    it('should render the name and email fields and the roles checkboxes', async () => {
      const formFields = await loader.getAllHarnesses(MatFormFieldHarness);
      const checkboxes = await loader.getAllHarnesses(MatCheckboxHarness);

      expect(formFields).toHaveLength(2);
      expect(await parallel(() => formFields.map((f) => f.getLabel()))).toEqual(
        ['Name *', 'Email *']
      );

      expect(checkboxes).toHaveLength(2);
      expect(
        await parallel(() => checkboxes.map((c) => c.isChecked()))
      ).toEqual([false, false]);
    });
    it('should not allow an email that is already in use', async () => {
      component.currentEmails = ['taken@example.com'];
      component.ngOnChanges({
        currentEmails: new SimpleChange(null, ['taken@example.com'], false),
      });
      fixture.detectChanges();

      fixture.componentInstance.editStaffForm.controls.email.setValue(
        'taken@example.com'
      );
      const emailField = await loader.getHarness(
        MatFormFieldHarness.with({ floatingLabelText: 'Email *' })
      );
      const emailInput = (await emailField.getControl()) as MatInputHarness;
      await emailInput.setValue('taken@example.com');
      await emailInput.blur();

      expect(await emailField.isControlValid()).toBeFalsy();
      expect(await emailField.getTextErrors()).toEqual([
        'Email is already taken',
      ]);
    });

    it('should not allow saving if the form is not valid', async () => {
      const [nameField, emailField] = await loader.getAllHarnesses(
        MatFormFieldHarness
      );
      const button = await loader.getHarness(MatButtonHarness);
      expect(await button.isDisabled()).toBeTruthy();

      await ((await nameField.getControl()) as MatInputHarness).setValue(
        'Test Name'
      );
      await ((await emailField.getControl()) as MatInputHarness).setValue(
        'test@example.com'
      );

      expect(await button.isDisabled()).toBeFalsy();
    });

    it('should emit the new staff member on save', async () => {
      const spy = jest.spyOn(component.save, 'emit');

      const [nameField, emailField] = await loader.getAllHarnesses(
        MatFormFieldHarness
      );
      const button = await loader.getHarness(MatButtonHarness);
      expect(await button.isDisabled()).toBeTruthy();

      await ((await nameField.getControl()) as MatInputHarness).setValue(
        'Test Name'
      );
      await ((await emailField.getControl()) as MatInputHarness).setValue(
        'test@example.com'
      );

      const checkboxes = await loader.getAllHarnesses(MatCheckboxHarness);

      await checkboxes[0].check();

      await button.click();
      expect(spy).toHaveBeenCalledWith({
        name: 'Test Name',
        email: 'test@example.com',
        roles: ['aod'],
        uid: '',
      });
    });
  });

  describe('when editing a staff member', () => {
    beforeEach(() => {
      component.staffMember = testAod;
      component.ngOnChanges({
        staffMember: new SimpleChange(null, testAod, false),
      });
    });
    it('should fill the fields with the staff member information given', async () => {
      const [nameInput, emailInput] = await loader.getAllHarnesses(
        MatInputHarness
      );
      const [aodCheck, adminCheck] = await loader.getAllHarnesses(
        MatCheckboxHarness
      );

      expect(await nameInput.getValue()).toBe(testAod.name);
      expect(await emailInput.getValue()).toBe(testAod.email);
      expect(await emailInput.isDisabled()).toBe(true);

      expect(await aodCheck.isChecked()).toBe(true);
      expect(await adminCheck.isChecked()).toBe(false);
    });
  });
});
