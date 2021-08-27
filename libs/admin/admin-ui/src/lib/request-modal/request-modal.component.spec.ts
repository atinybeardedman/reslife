import { HarnessLoader, parallel } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { formatDate } from '@angular/common';
import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatButtonToggleGroupHarness, MatButtonToggleHarness } from '@angular/material/button-toggle/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import { MatSelectHarness } from '@angular/material/select/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LeaveStayRequest, testLeaveRequest } from '@reslife/admin-model';

import { RequestModalComponent } from './request-modal.component';
import { RequestModalModule } from './request-modal.module';

describe('RequestModalComponent', () => {
  let component: RequestModalComponent;
  let fixture: ComponentFixture<RequestModalComponent>;
  let loader: HarnessLoader;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestModalModule, NoopAnimationsModule],
      declarations: [ RequestModalComponent ]
    })
    .overrideComponent(RequestModalComponent, {
      set: {
        changeDetection: ChangeDetectionStrategy.Default
      }
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('When editing a pending request', () => {
    beforeEach(() =>{
      component.request = testLeaveRequest;
      fixture.detectChanges();
    });

    it('should display the fields filled with the appropriate data', async () => {
      const inputs = await loader.getAllHarnesses(MatInputHarness);
      expect(await parallel(() => inputs.map(i => i.getValue()))).toEqual([
        component.request?.student.name,
        component.request?.explaination,
        formatDate(component.request?.startDate as string, 'short', 'en-US'),
        formatDate(component.request?.endDate as string, 'short', 'en-US')
      ]);
      const select = await loader.getHarness(MatSelectHarness);
      expect(await select.getValueText()).toBe(component.request?.type);
    });

    it('should not allow saving until the status is changed', async () => {
      const button = await loader.getHarness(MatButtonHarness.with({text: 'Save'}));
      expect(await button.isDisabled()).toBe(true);

      const toggleButton = await loader.getHarness(MatButtonToggleHarness.with({text: 'Approve'}));
      await toggleButton.check();
      fixture.detectChanges();
      expect(await button.isDisabled()).toBe(false);
    });

    it('should display the required reason field when rejected', async () => {
      const toggleButton = await loader.getHarness(MatButtonToggleHarness.with({text: 'Reject'}));
      await toggleButton.check();
      fixture.detectChanges();

      const input = await loader.getHarness(MatInputHarness.with({selector: '#rejectionReason'}));
      expect(await input.isDisabled()).toBe(false);

      const button = await loader.getHarness(MatButtonHarness.with({text: 'Save'}));
      expect(await button.isDisabled()).toBe(true);
    });

    it('should emit the request on save', async () => {
      const spy = jest.spyOn(component.save, 'emit');
      const toggleButton = await loader.getHarness(MatButtonToggleHarness.with({text: 'Approve'}));
      await toggleButton.check();

      const button = await loader.getHarness(MatButtonHarness.with({text: 'Save'}));
      await button.click();
      fixture.detectChanges()
      expect(spy).toHaveBeenCalledWith(component.request);

    })
  });

  describe('When viewing a past request', () => {
    beforeEach(() =>{
      const completedRequest: LeaveStayRequest = {...testLeaveRequest, status: 'Approved'};
      component.request = completedRequest;
      component.readOnly = true;
      fixture.detectChanges();
    });

    it('should not show the save button', async () => {
      const saveButtons = await loader.getAllHarnesses(MatButtonHarness.with({text: 'Save'}));
      expect(saveButtons).toHaveLength(0);
    });

    it('should disable the button toggle', async () => {
      const buttonToggleGroup = await loader.getHarness(MatButtonToggleGroupHarness);
      expect(await buttonToggleGroup.isDisabled()).toBe(true);
    });

    it('should show the disabled rejection reason for a rejected request', async () => {
      component.request = {...testLeaveRequest, status: 'Rejected', rejectionReason: 'Your parents denied permission for this trip'};
      fixture.detectChanges();

     const input = await loader.getHarness(MatInputHarness.with({selector: '#rejectionReason'}));
     expect(await input.isDisabled()).toBe(true);
     expect(await input.getValue()).toBe(component.request.rejectionReason);

    })

  });
});
