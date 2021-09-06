import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ChangeDetectionStrategy, SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatTableHarness } from '@angular/material/table/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TimeExcusalDoc } from '@reslife/aod-model';

import { TimeBasedExcusalTableComponent } from './time-based-excusal-table.component';
import { TimeBasedExcusalTableModule } from './time-based-excusal-table.module';

describe('TimeBasedExcusalTableComponent', () => {
  let component: TimeBasedExcusalTableComponent;
  let fixture: ComponentFixture<TimeBasedExcusalTableComponent>;
  let loader: HarnessLoader;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeBasedExcusalTableModule, NoopAnimationsModule],
      declarations: [ TimeBasedExcusalTableComponent ]
    })
    .overrideComponent(TimeBasedExcusalTableComponent, {
      set: {
        changeDetection: ChangeDetectionStrategy.Default
      }
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeBasedExcusalTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the message if no excusals found', async () => {
    expect(fixture.debugElement.query(By.css('h1')).nativeElement.textContent).toContain('No Excusals Defined');
    const table = await loader.getHarness(MatTableHarness);
    expect(await table.getRows()).toHaveLength(0);
  });

  const testExcusal: TimeExcusalDoc = {
    uid: '1',
    boarder: {
      name: 'Test Boarder',
      uid: '1'
    },
    leaveDate: '2021-09-13T13:52:00-04:00',
    returnDate: '2021-09-14T20:00:00-04:00',
    reason: 'Home',
    includedDays: ['2021-09-13', '2021-09-14'],

  };
  describe('when excusals exist', () => {
    beforeEach(() => {
      component.excusals = [testExcusal];
      component.ngOnChanges({
        excusals: new SimpleChange(null,[testExcusal], false)
      });
      fixture.detectChanges()
    })
    it('should show the excusals in the table', async () => {
      const  table = await loader.getHarness(MatTableHarness);
      const rows = await table.getRows(); 
      expect(rows).toHaveLength(1);
      expect(await rows[0].getCellTextByIndex()).toEqual([
        testExcusal.boarder.name, component.getRange(testExcusal), 'delete'
      ]);
    });

    it('should emit the excusal on delete action', async () => {
      const deleteSpy = jest.spyOn(component.delete, 'emit');
      const deleteButton = await loader.getHarness(MatButtonHarness.with({text: 'delete'}));
      await deleteButton.click();
      fixture.detectChanges();
      expect(deleteSpy).toHaveBeenCalledWith({action: 'delete', record: testExcusal});
    });
  })

});
