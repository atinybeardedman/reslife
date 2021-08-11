import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import {
  ChangeDetectionStrategy,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MaintenanceRequestUiModule } from '@reslife/maintenance-request-ui';
import { MockModule, MockProvider } from 'ng-mocks';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { HarnessLoader } from '@angular/cdk/testing';

import { MaintenanceRequestPageComponent } from './maintenance-request-page.component';

import { MatButtonHarness } from '@angular/material/button/testing';
import { MaintenanceRequestDataService } from '@reslife/maintenance-request-data-access';
import { By } from '@angular/platform-browser';

describe('MaintenanceRequestPageComponent', () => {
  let component: MaintenanceRequestPageComponent;
  let fixture: ComponentFixture<MaintenanceRequestPageComponent>;
  let loader: HarnessLoader;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MockModule(MaintenanceRequestUiModule),
        MatButtonModule,
        MatDialogModule,
        FlexLayoutModule,
        MatCardModule,
        NoopAnimationsModule
      ],
      declarations: [ MaintenanceRequestPageComponent ],
      providers: [MockProvider(MaintenanceRequestDataService, {
        getRequests: jest.fn()
      })],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .overrideComponent(MaintenanceRequestPageComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default },
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenanceRequestPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the button for a new request', async () => {
    const button = await loader.getHarness(MatButtonHarness);
    expect(button).not.toBeNull();
  });

  it('should render the table of requests', () => {
    expect(fixture.debugElement.query(By.css('reslife-maintenance-request-table'))).not.toBeNull();
  });
});
