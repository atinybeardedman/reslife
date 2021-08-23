import { HarnessLoader, parallel } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import {
  ChangeDetectionStrategy,
  CUSTOM_ELEMENTS_SCHEMA,
  SimpleChange,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatTableHarness } from '@angular/material/table/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DormDocument } from '@reslife/shared-models';

import { DormManagementTableComponent } from './dorm-management-table.component';
import { DormManagementTableModule } from './dorm-management-table.module';

const testDorms: DormDocument[] = [
  {
    name: 'Newlin',
    isActive: true,
  },
  {
    name: 'Reagan',
    isActive: true,
  },
  {
    name: 'Craig',
    isActive: false,
  },
];
describe('DormManagementTableComponent', () => {
  let component: DormManagementTableComponent;
  let fixture: ComponentFixture<DormManagementTableComponent>;
  let loader: HarnessLoader;

  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
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
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DormManagementTableModule, NoopAnimationsModule],
      declarations: [DormManagementTableComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .overrideComponent(DormManagementTableComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DormManagementTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show no results if no dorms exist', async () => {
    expect(
      fixture.debugElement.query(By.css('h1')).nativeElement.textContent
    ).toContain('No Dorms Found');
    const table = await loader.getHarness(MatTableHarness);
    expect(await table.getRows()).toHaveLength(0);
  });

  describe('When dorms exist', () => {
    beforeEach(() => {
      component.dorms = [...testDorms];
      component.ngOnChanges({
        dorms: new SimpleChange(null, [...testDorms], false),
      });
    });

    it('should show the table', async () => {
      const table = await loader.getHarness(MatTableHarness);
      expect(table).toBeTruthy();
      const rows = await table.getRows();
      expect(rows.length).toBe(3);
      const cells = await rows[0].getCells();
      const cellTexts = await parallel(() =>
        cells.map((cell) => cell.getText())
      );
      expect(cellTexts).toEqual([
       testDorms[0].name,
        'domain',
        'editdelete',
      ]);
    });

    it('should emit the dorm and action type when clicked', async () => {
      const editSpy = jest.spyOn(component.edit, 'emit');
      const deleteSpy = jest.spyOn(component.delete, 'emit');
      const editButton = await loader.getHarness(
        MatButtonHarness.with({ text: 'edit' })
      );
      await editButton.click();
      expect(editSpy).toHaveBeenCalledWith({
        action: 'edit',
        record: testDorms[0],
      });

      const deleteButton = await loader.getHarness(
        MatButtonHarness.with({ text: 'delete' })
      );
      await deleteButton.click();
      expect(deleteSpy).toHaveBeenCalledWith({
        action: 'delete',
        record: testDorms[0],
      });
    });
  });
});
