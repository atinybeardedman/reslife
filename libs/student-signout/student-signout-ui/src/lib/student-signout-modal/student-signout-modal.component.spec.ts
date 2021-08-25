import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { StudentSignoutModalComponent } from './student-signout-modal.component';
import { HarnessLoader, parallel } from '@angular/cdk/testing';
import {
  ChangeDetectionStrategy,
  CUSTOM_ELEMENTS_SCHEMA,
  SimpleChange,
} from '@angular/core';
import { MatFormFieldHarness } from '@angular/material/form-field/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import { MatSelectHarness } from '@angular/material/select/testing';
import { By } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { SharedUiModule } from '@reslife/shared/ui';
import { MockModule } from 'ng-mocks';
import { MatButtonHarness } from '@angular/material/button/testing';

import {
  allPermissionsTest,
  partialPermissionsTest,
  carRestrictionTest,
  campusedTest,
  testCurrentSignout,
} from '@reslife/student-signout-model';
describe('StudentSignoutModalComponent', () => {
  let component: StudentSignoutModalComponent;
  let fixture: ComponentFixture<StudentSignoutModalComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        MockModule(SharedUiModule),
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatSelectModule,
        MatButtonModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
      ],
      declarations: [StudentSignoutModalComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .overrideComponent(StudentSignoutModalComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentSignoutModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('before a student is selected', () => {
    it('should only show the name picker', async () => {
      expect(
        fixture.debugElement.query(By.css('reslife-search-select'))
      ).toBeTruthy();
      const formFields = await loader.getAllHarnesses(MatFormFieldHarness);
      expect(formFields).toHaveLength(0);
    });
    it('should disable the signout button', async () => {
      const button = await loader.getHarness(
        MatButtonHarness.with({ text: 'Sign Out' })
      );
      expect(await button.isDisabled()).toBeTruthy();
    });
  });

  describe('When a not campused student is selected', () => {
    beforeEach(() => {
      component.boarders = [
        allPermissionsTest,
        partialPermissionsTest,
        carRestrictionTest,
        campusedTest,
      ];
      component.ngOnChanges({
        boarders: new SimpleChange(null, component.boarders, true),
      });
      component.selectedBoarder = partialPermissionsTest;
      fixture.detectChanges();
    });
    it('should show the form', () => {
      expect(fixture.debugElement.query(By.css('form'))).not.toBeNull();
    });
    it('should only show transportation methods the student has permissions for', async () => {
      const select = await loader.getHarness(MatSelectHarness);
      await select.open();
      const options = await select.getOptions();
      expect(options).toHaveLength(1);
      expect(await options[0].getText()).toBe('Walk');
    });
    it('should show the which car field when car is selected', async () => {
      component.selectedBoarder = carRestrictionTest;
      fixture.detectChanges();
      const select = await loader.getHarness(MatSelectHarness);
      await select.open();
      await select.clickOptions({ text: 'Car' });
      fixture.detectChanges();
      const whichCarField = await loader.getHarness(
        MatFormFieldHarness.with({ floatingLabelText: 'Which Car? *' })
      );
      expect(whichCarField).toBeTruthy();
      expect(await whichCarField.getTextHints()).toEqual([
        component.selectedBoarder.permissions.carRestriction,
      ]);
    });
    it('should not allow signing out if the form is invalid', async () => {
      const saveButton = await loader.getHarness(
        MatButtonHarness.with({ text: 'Sign Out' })
      );
      expect(await saveButton.isDisabled()).toBeTruthy();
      const destinationField = await loader.getHarness(MatInputHarness);
      const select = await loader.getHarness(MatSelectHarness);
      await destinationField.setValue('Starbucks');
      await select.open();
      await select.clickOptions({ text: 'Walk' });
      fixture.detectChanges();
      expect(await saveButton.isDisabled()).toBeFalsy();
    });
  });

  describe('When a campused student is selected', () => {
    beforeEach(() => {
      component.boarders = [
        allPermissionsTest,
        partialPermissionsTest,
        carRestrictionTest,
        campusedTest,
      ];
      component.ngOnChanges({
        boarders: new SimpleChange(null, component.boarders, true),
      });
      component.selectedBoarder = campusedTest;
      fixture.detectChanges();
    });
    it('should show they are campused instead of the form', () => {
      expect(
        fixture.debugElement.query(By.css('h3')).nativeElement.textContent
      ).toEqual('Campused');
      expect(fixture.debugElement.query(By.css('form'))).toBeNull();
    });

    it('should disable the signout button', async () => {
      const saveButton = await loader.getHarness(
        MatButtonHarness.with({ text: 'Sign Out' })
      );
      expect(await saveButton.isDisabled()).toBeTruthy();
    });
  });

  describe('When editing a signout', () => {
    beforeEach(() => {
      component.signoutMeta = allPermissionsTest;
      component.signout = testCurrentSignout;
      component.ngOnChanges({
        signoutMeta: new SimpleChange(null, allPermissionsTest, true),
        signout: new SimpleChange(null, testCurrentSignout, true),
      });
      fixture.detectChanges();
    });
    it('should not allow the user to change the student', async () => {
      expect(
        fixture.debugElement.query(By.css('reslife-search-select'))
      ).toBeNull();
      const input = await loader.getHarness(MatInputHarness);
      expect(await input.getValue()).toBe(testCurrentSignout.student.name);
      expect(await input.isDisabled()).toBeTruthy();
    });
    it('should fill the fields with the given signout information', async () => {
      const inputs = await loader.getAllHarnesses(MatInputHarness);
      const select = await loader.getHarness(MatSelectHarness);
      expect(await parallel(() => inputs.map((i) => i.getValue()))).toEqual([
        testCurrentSignout.student.name,
        testCurrentSignout.destination,
        testCurrentSignout.transportNote,
      ]);
      expect(await select.getValueText()).toBe('Car');
    });
  });
});
