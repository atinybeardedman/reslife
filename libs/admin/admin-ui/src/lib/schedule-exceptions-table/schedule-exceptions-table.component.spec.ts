import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ChangeDetectionStrategy, SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatTableHarness } from '@angular/material/table/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { testExceptionDay } from '@reslife/admin-model';

import { ScheduleExceptionsTableComponent } from './schedule-exceptions-table.component';
import { ScheduleExceptionsTableModule } from './schedule-exceptions-table.module';

describe('ScheduleExceptionsTableComponent', () => {
  let component: ScheduleExceptionsTableComponent;
  let fixture: ComponentFixture<ScheduleExceptionsTableComponent>;
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
      imports: [NoopAnimationsModule, ScheduleExceptionsTableModule],
      declarations: [ScheduleExceptionsTableComponent],
    })
      .overrideComponent(ScheduleExceptionsTableComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default,
        },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleExceptionsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show no rows if there are no exceptions', async () => {
    expect(
      fixture.debugElement.query(By.css('h1')).nativeElement.textContent
    ).toContain('No Exceptions Found');
    const table = await loader.getHarness(MatTableHarness);
    expect(await table.getRows()).toHaveLength(0);
  });

  describe('when there are exceptions', () => {
    beforeEach(() => {
      component.exceptions = [testExceptionDay];
      component.ngOnChanges({
        exceptions: new SimpleChange(null, [testExceptionDay], false),
      });
    });
    it('should display the exceptions in the table', async () => {
      const table = await loader.getHarness(MatTableHarness);
      const rows = await table.getRows();
      expect(rows).toHaveLength(1);
      expect(await rows[0].getCellTextByIndex()).toEqual([
        testExceptionDay.date,
        testExceptionDay.note,
        'editdelete',
      ]);
    });
    it('should emit the action when clicked', async () => {
        const editSpy = jest.spyOn(component.edit, 'emit');
        const deleteSpy = jest.spyOn(component.delete, 'emit');
        const editButton = await loader.getHarness(
          MatButtonHarness.with({ text: 'edit' })
        );
        await editButton.click();
        expect(editSpy).toHaveBeenCalledWith({
          action: 'edit',
          record: testExceptionDay,
        });
  
        const deleteButton = await loader.getHarness(
          MatButtonHarness.with({ text: 'delete' })
        );
        await deleteButton.click();
        expect(deleteSpy).toHaveBeenCalledWith({
          action: 'delete',
          record: testExceptionDay,
        });
    });
  });
});
