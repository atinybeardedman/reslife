import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ChangeDetectionStrategy, SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatTableHarness } from '@angular/material/table/testing';
import { By } from '@angular/platform-browser';

import { BreakManagementTableComponent } from './break-management-table.component';
import { BreakManagementTableModule } from './break-management-table.module';
import { testBreak } from '@reslife/admin-model';
describe('BreakManagementTableComponent', () => {
  let component: BreakManagementTableComponent;
  let fixture: ComponentFixture<BreakManagementTableComponent>;
  let loader: HarnessLoader;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreakManagementTableModule],
      declarations: [ BreakManagementTableComponent ]
    })
    .overrideComponent(BreakManagementTableComponent, {
      set: {
        changeDetection: ChangeDetectionStrategy.Default
      }
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BreakManagementTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('When breaks exist', () => {
    let table:MatTableHarness;
    beforeEach(async () => {
      component.breaks = [testBreak];
      component.ngOnChanges({
        breaks: new SimpleChange(null, [testBreak], false)
      });
      fixture.detectChanges();
      table = await loader.getHarness(MatTableHarness);
    })
    it('should display breaks', async () => {
      const rows = await table.getRows(); 
      expect(rows).toHaveLength(1);
      expect(await rows[0].getCellTextByIndex()).toEqual([
        testBreak.name, component.getRange(testBreak), 'editdelete'
      ]);
    });


    it('should emit the appropriate action when the action buttons are clicked', async () => {
      const editSpy = jest.spyOn(component.edit, 'emit');
      const deleteSpy = jest.spyOn(component.delete, 'emit');
      const editButton = await loader.getHarness(MatButtonHarness.with({text: 'edit'}));
      const deleteButton = await loader.getHarness(MatButtonHarness.with({text: 'delete'}));
      await editButton.click();
      fixture.detectChanges();
      expect(editSpy).toHaveBeenCalledWith({action: 'edit', record: testBreak});

      await deleteButton.click();
      fixture.detectChanges();
      expect(deleteSpy).toHaveBeenCalledWith({action: 'delete', record: testBreak});
    });
  });

  describe('When no requests exist', () => {
    it('should show a message indicating no breaks exist', async () => {
      expect(fixture.debugElement.query(By.css('h1')).nativeElement.textContent).toContain('No Breaks Defined');
      const table = await loader.getHarness(MatTableHarness);
      expect(await table.getRows()).toHaveLength(0);
    });
  })
});
