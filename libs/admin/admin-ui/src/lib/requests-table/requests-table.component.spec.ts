import { HarnessLoader, parallel } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ChangeDetectionStrategy, SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatTableHarness } from '@angular/material/table/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  LeaveStayRequest,
  testLeaveRequest,
  testStayRequest,
} from '@reslife/admin-model';

import { RequestsTableComponent } from './requests-table.component';
import { RequestsTableModule } from './requests-table.module';

describe('RequestsTableComponent', () => {
  let component: RequestsTableComponent;
  let fixture: ComponentFixture<RequestsTableComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestsTableModule, NoopAnimationsModule],
      declarations: [RequestsTableComponent],
    })
      .overrideComponent(RequestsTableComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default,
        },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('when there are no requests', () => {
    it('should render no rows and display a message', async () => {
      expect(
        fixture.debugElement.query(By.css('h1')).nativeElement.textContent
      ).toContain('No Requests Found');
      const table = await loader.getHarness(MatTableHarness);
      expect(await table.getRows()).toHaveLength(0);
    });
  });

  describe('when there are pending requests', () => {
    beforeEach(() => {
      component.requests = [testStayRequest, testLeaveRequest];
      component.ngOnChanges({
        requests: new SimpleChange(
          null,
          [testStayRequest, testLeaveRequest],
          false
        ),
      });
    });
    it('should render the correct rows and columns', async () => {
      const table = await loader.getHarness(MatTableHarness);
      const rows = await table.getRows();
      expect(rows).toHaveLength(2);
      const [row1, row2] = await parallel(() =>
        rows.map((r) => r.getCellTextByIndex())
      );
      expect(row1).toEqual([
        testStayRequest.student.name,
        'Stay',
        '9/10 - 9/12',
        'open_in_new',
      ]);
      expect(row2).toEqual([
        testLeaveRequest.student.name,
        'Leave',
        '9/11 - 9/12',
        'open_in_new',
      ]);
    });

    it('should emit the request when the view button is clicked', async () => {
      const spy = jest.spyOn(component.view, 'emit');
      const button = await loader.getHarness(MatButtonHarness);
      await button.click();
      fixture.detectChanges();

      expect(spy).toHaveBeenCalledWith({
        record: testStayRequest,
        action: 'view',
      });
    });
  });

  describe('When viewing past reqests', () => {
    beforeEach(() => {
      const approvedRequest: LeaveStayRequest = {
        ...testStayRequest,
        status: 'Approved',
      };
      const rejectedRequest: LeaveStayRequest = {
        ...testLeaveRequest,
        status: 'Rejected',
      };
      component.requests = [approvedRequest, rejectedRequest];
      component.ngOnChanges({
        requests: new SimpleChange(
          null,
          [approvedRequest, rejectedRequest],
          false
        ),
      });
    });
    it('should render rows the appropriate color based on the status', async () => {
      const table = await loader.getHarness(MatTableHarness);
      const rows = await table.getRows();
      const hosts = await parallel(() => rows.map((r) => r.host()));
      expect(await hosts[0].hasClass('mat-success')).toBe(true);
      expect(await hosts[1].hasClass('mat-warn')).toBe(true);
    });
  });
});
