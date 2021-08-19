import { HarnessLoader, parallel } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { CampusedManagementTableComponent } from './campused-management-table.component';
import { CampusedManagementTableModule } from './campused-management-table.module';
import { MatTableHarness } from '@angular/material/table/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { testCampusedRecord } from '@reslife/shared-models';
import { getDateFromDatestring } from '@reslife/utils';
import { formatDate } from '@angular/common';
import { MatButtonHarness } from '@angular/material/button/testing';
describe('CampusedManagementTableComponent', () => {
  let component: CampusedManagementTableComponent;
  let fixture: ComponentFixture<CampusedManagementTableComponent>;
  let loader: HarnessLoader;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampusedManagementTableComponent ],
      imports: [
        CampusedManagementTableModule,
        NoopAnimationsModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .overrideComponent(CampusedManagementTableComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampusedManagementTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show no results if there are no campused students with end dates in the future', async () => {
    expect(fixture.debugElement.query(By.css('h1')).nativeElement.textContent).toContain('No Campused Students Found');
    const table =  await loader.getHarness(MatTableHarness);
    expect(await table.getRows()).toHaveLength(0);
  });

  describe('if campused records exist', () => {
    beforeEach(() => {
      component.campused = [testCampusedRecord];
      component.ngOnChanges({
        campused: new SimpleChange(null, [testCampusedRecord], false),
      });
    });
    it('should show the table', async () => {
      const table = await loader.getHarness(MatTableHarness);
      expect(table).toBeTruthy();
      const rows = await table.getRows();
      expect(rows.length).toBe(1);
      const cells = await rows[0].getCells();
      const cellTexts = await parallel(() =>
        cells.map((cell) => cell.getText())
      );
      expect(cellTexts).toEqual([
        testCampusedRecord.name,
        formatDate(getDateFromDatestring(testCampusedRecord.startDate), 'M/d', 'en-US'),
        formatDate(getDateFromDatestring(testCampusedRecord.endDate), 'M/d', 'en-US'),
        'editdelete',
      ]);
    });

    it('should emit the record and action type when the action is clicked', async () => {
      const editSpy = jest.spyOn(component.edit, 'emit');
      const deleteSpy = jest.spyOn(component.delete, 'emit');
      const editButton = await loader.getHarness(
        MatButtonHarness.with({ text: 'edit' })
      );
      await editButton.click();
      expect(editSpy).toHaveBeenCalledWith({
        action: 'edit',
        record: testCampusedRecord,
      });

      const deleteButton = await loader.getHarness(
        MatButtonHarness.with({ text: 'delete' })
      );
      await deleteButton.click();
      expect(deleteSpy).toHaveBeenCalledWith({
        action: 'delete',
        record: testCampusedRecord,
      });
    })
  })
});
