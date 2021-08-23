import { HarnessLoader } from '@angular/cdk/testing';
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
import { testAod, testStaffMember } from '@reslife/admin-model';

import { StaffManagementTableComponent } from './staff-management-table.component';
import { StaffManagementTableModule } from './staff-management-table.module';

describe('StaffManagementTableComponent', () => {
  let component: StaffManagementTableComponent;
  let fixture: ComponentFixture<StaffManagementTableComponent>;
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
      imports: [StaffManagementTableModule, NoopAnimationsModule],
      declarations: [StaffManagementTableComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .overrideComponent(StaffManagementTableComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default,
        },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffManagementTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show no results if no staff exists', async () => {
    expect(
      fixture.debugElement.query(By.css('h1')).nativeElement.textContent
    ).toContain('No Staff Found');
    const table = await loader.getHarness(MatTableHarness);
    expect(await table.getRows()).toHaveLength(0);
  });

  describe('if staff exist', () => {
    beforeEach(() => {
      component.staff = [testStaffMember, testAod];
      component.ngOnChanges({
        staff: new SimpleChange(null, [testStaffMember, testAod], false),
      });
    });

    it('should render the table and rows', async () => {
      const table = await loader.getHarness(MatTableHarness);
      const rows = await table.getRows();
      expect(rows).toHaveLength(2);
      expect(await rows[0].getCellTextByIndex()).toEqual([
        testStaffMember.name,
        '',
        'editdelete',
      ]);
      expect(await rows[1].getCellTextByIndex()).toEqual([
        testAod.name,
        'supervisor_account',
        'editdelete',
      ]);
    });
    it('should emit the staff member and action when clicked', async () => {
      const editSpy = jest.spyOn(component.edit, 'emit');
      const deleteSpy = jest.spyOn(component.delete, 'emit');
      const editButton = await loader.getHarness(
        MatButtonHarness.with({ text: 'edit' })
      );
      await editButton.click();
      expect(editSpy).toHaveBeenCalledWith({
        action: 'edit',
        record: testStaffMember,
      });

      const deleteButton = await loader.getHarness(
        MatButtonHarness.with({ text: 'delete' })
      );
      await deleteButton.click();
      expect(deleteSpy).toHaveBeenCalledWith({
        action: 'delete',
        record: testStaffMember,
      });
    });
  });
});
