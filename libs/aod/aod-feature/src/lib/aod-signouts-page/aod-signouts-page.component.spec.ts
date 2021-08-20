import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AodSignoutDataService } from '@reslife/aod-data-access';
import { MockModule, MockProvider } from 'ng-mocks';

import { AodSignoutsPageComponent } from './aod-signouts-page.component';
import { AodSignoutsPageModule } from './aod-signouts-page.module';

describe('AodSignoutsPageComponent', () => {
  let component: AodSignoutsPageComponent;
  let fixture: ComponentFixture<AodSignoutsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AodSignoutsPageModule, NoopAnimationsModule],
      declarations: [ AodSignoutsPageComponent ],
      providers: [
        MockProvider(AodSignoutDataService),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AodSignoutsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
