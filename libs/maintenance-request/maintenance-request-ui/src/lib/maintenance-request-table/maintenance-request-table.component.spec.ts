import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import {
  ChangeDetectionStrategy,
  CUSTOM_ELEMENTS_SCHEMA,
  SimpleChange,
} from '@angular/core';

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatTableHarness } from '@angular/material/table/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MaintenanceRequestTableComponent } from './maintenance-request-table.component';
import { MaintenanceRequestTableModule } from './maintenance-request-table.module'
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { testRequests } from '@reslife/maintenance-request-model';


describe('MaintenanceRequestTableComponent', () => {
  let component: MaintenanceRequestTableComponent;
  let fixture: ComponentFixture<MaintenanceRequestTableComponent>;
  let loader: HarnessLoader;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaintenanceRequestTableComponent ],
      imports: [
        MaintenanceRequestTableModule,
        NoopAnimationsModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .overrideComponent(MaintenanceRequestTableComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default },
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenanceRequestTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('When requests exist', () => {
    let table:MatTableHarness;
    beforeEach(async () => {
      component.requests = testRequests;
      component.ngOnChanges({
        requests: new SimpleChange(null, testRequests, false)
      });
      fixture.detectChanges();
      table = await loader.getHarness(MatTableHarness);
    })
    it('should display requests', async () => {
      expect(await table.getRows()).toHaveLength(testRequests.length);
    });


    it('should emit request when detail button is clicked', async () => {
      const showDetailSpy = jest.spyOn(component.showDetail, 'emit');
      const button = await loader.getHarness(MatButtonHarness);
      await button.click();
      expect(showDetailSpy).toHaveBeenCalledWith(testRequests[0]);
    });
  });

  describe('When no requests exist', () => {
    it('should show a message indicating no requests exist', async () => {
      expect(fixture.debugElement.query(By.css('h1')).nativeElement.textContent).toContain('No Requests Found');
      const table = await loader.getHarness(MatTableHarness);
      expect(await table.getRows()).toHaveLength(0);
    });
  })
});
