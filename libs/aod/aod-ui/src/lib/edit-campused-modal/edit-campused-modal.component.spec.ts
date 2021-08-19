import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedUiModule } from '@reslife/shared/ui';
import { MockModule } from 'ng-mocks';

import { EditCampusedModalComponent } from './edit-campused-modal.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HarnessLoader } from '@angular/cdk/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import { ChangeDetectionStrategy, SimpleChange } from '@angular/core';
import { By } from '@angular/platform-browser';
import { testCampusedRecord } from '@reslife/shared-models';
import { formatDate } from '@angular/common';
import { getDateFromDatestring } from '@reslife/utils';

describe('EditCampusedModalComponent', () => {
  let component: EditCampusedModalComponent;
  let fixture: ComponentFixture<EditCampusedModalComponent>;
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
      declarations: [EditCampusedModalComponent],
      imports: [
        MockModule(SharedUiModule),
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatDatepickerModule,
        MatNativeDateModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        NoopAnimationsModule,
      ],
    })
      .overrideComponent(EditCampusedModalComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCampusedModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not allow saving if the form is invalid or a student has not been selected', async () => {
    let saveButton = await loader.getHarness(MatButtonHarness);
    expect(await saveButton.isDisabled()).toBeTruthy();

    component.selectedBoarder = {
      name: 'Test Boarder',
      uid: '1234',
    };
    fixture.detectChanges();
    saveButton = await loader.getHarness(MatButtonHarness);

    const endDate = new Date(new Date().getTime() * 24 * 3600 * 1000);
    const [_startInput, endInput] = await loader.getAllHarnesses(
      MatInputHarness
    );
    await endInput.setValue(endDate.toLocaleDateString('en-US'));
    fixture.detectChanges();
    saveButton = await loader.getHarness(MatButtonHarness);
    expect(await saveButton.isDisabled()).toBeFalsy();
  });

  describe('when creating a new record', () => {
    it('should render the student select', () => {
      component.selectedBoarder = null;
      expect(
        fixture.debugElement.query(By.css('reslife-search-select'))
      ).not.toBeNull();
    });

    it('should render the date inputs starting today', async () => {
      component.selectedBoarder = {
        name: 'Test Boarder',
        uid: '1234',
      };
      fixture.detectChanges();
      const inputs = await loader.getAllHarnesses(MatInputHarness);
      expect(inputs).toHaveLength(2);
      expect(await inputs[0].getValue()).toBe('9/1/2021');
      expect(await inputs[1].getValue()).toBe('');
    });

    it('should output the completed record on save', async () => {
      const spy = jest.spyOn(component.save, 'emit');

      component.selectedBoarder = {
        name: 'Test Boarder',
        uid: '1234',
      };
      fixture.detectChanges();
      const inputs = await loader.getAllHarnesses(MatInputHarness);
      await inputs[1].setValue('9/5/2021');
      fixture.detectChanges();
      const button = await loader.getHarness(MatButtonHarness);
      await button.click();
      fixture.detectChanges();

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith({
        ...component.selectedBoarder,
        startDate: '2021-09-01',
        endDate: '2021-09-05',
      });
    });
  });

  describe('when editing a record', () => {
    beforeEach(() => {
      component.record = testCampusedRecord;
      component.ngOnChanges({
        record: new SimpleChange(null, component.record, true),
      });
    });
    it('should render a disabled input with the student selected', async () => {
      const input = await loader.getHarness(MatInputHarness);
      expect(await input.isDisabled()).toBeTruthy();
    });

    it('should render the dates from the record pre-filled in the inputs', async () => {
      const inputs = await loader.getAllHarnesses(MatInputHarness);
      const [_name, startDate, endDate] = inputs;

      expect(await startDate.getValue()).toBe(
        formatDate(
          getDateFromDatestring(testCampusedRecord.startDate),
          'M/d/YYYY',
          'en-US'
        )
      );
      expect(await endDate.getValue()).toBe(
        formatDate(
          getDateFromDatestring(testCampusedRecord.endDate),
          'M/d/YYYY',
          'en-US'
        )
      );
    });
  });
});
