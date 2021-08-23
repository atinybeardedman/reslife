import { HarnessLoader, parallel } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import {
  ChangeDetectionStrategy,
  CUSTOM_ELEMENTS_SCHEMA,
  SimpleChange,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatTableHarness } from '@angular/material/table/testing';
import { MatTableModule } from '@angular/material/table';

import { ManageBoardersTableComponent } from './manage-boarders-table.component';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { testBoarder } from '@reslife/shared-models';
import { MatPaginatorModule } from '@angular/material/paginator';
import { By } from '@angular/platform-browser';

describe('ManageBoardersTableComponent', () => {
  let component: ManageBoardersTableComponent;
  let fixture: ComponentFixture<ManageBoardersTableComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageBoardersTableComponent],
      imports: [
        MatTableModule,
        MatButtonModule,
        MatIconModule,
        MatPaginatorModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .overrideComponent(ManageBoardersTableComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageBoardersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show no results if no boarders exist', async () => {
    expect(fixture.debugElement.query(By.css('h1')).nativeElement.textContent).toContain('No Boarders Found');
    const table =  await loader.getHarness(MatTableHarness);
    expect(await table.getRows()).toHaveLength(0);
  });
  describe('if boarders exist', () => {
    beforeEach(() => {
      component.boarders = [testBoarder];
      component.ngOnChanges({
        boarders: new SimpleChange(null, [testBoarder], false),
      });
    });
    it('should show the table when boarders exist', async () => {
      const table = await loader.getHarness(MatTableHarness);
      expect(table).toBeTruthy();
      const rows = await table.getRows();
      expect(rows.length).toBe(1);
      const cells = await rows[0].getCells();
      const cellTexts = await parallel(() =>
        cells.map((cell) => cell.getText())
      );
      expect(cellTexts).toEqual([
        testBoarder.name,
        testBoarder.type,
        'editdelete',
      ]);
    });

    it('should emit the boarder and action type when an action is clicked', async () => {
      const editSpy = jest.spyOn(component.edit, 'emit');
      const deleteSpy = jest.spyOn(component.delete, 'emit');
      const editButton = await loader.getHarness(
        MatButtonHarness.with({ text: 'edit' })
      );
      await editButton.click();
      expect(editSpy).toHaveBeenCalledWith({
        action: 'edit',
        record: testBoarder,
      });

      const deleteButton = await loader.getHarness(
        MatButtonHarness.with({ text: 'delete' })
      );
      await deleteButton.click();
      expect(deleteSpy).toHaveBeenCalledWith({
        action: 'delete',
        record: testBoarder,
      });
    });
    it('should show the correct columns based on the showDate input', async () => {
      let table = await loader.getHarness(MatTableHarness);
      let [headerRow] = await table.getHeaderRows();
      let cells = await headerRow.getCellTextByIndex();
      expect(cells).toEqual(['Name', 'Board Type', 'Actions']);

      component.showDates = true;
      component.ngOnChanges({
        showDates: new SimpleChange(null, true, false),
      });
      fixture.detectChanges();

      table = await loader.getHarness(MatTableHarness);
      [headerRow] = await table.getHeaderRows();
      cells = await headerRow.getCellTextByIndex();
      expect(cells).toEqual(['Name', 'Start Date', 'End Date', 'Actions']);
    });
  });
});
