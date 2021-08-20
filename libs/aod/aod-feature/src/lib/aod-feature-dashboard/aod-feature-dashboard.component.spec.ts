import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockModule } from 'ng-mocks';

import { AodFeatureDashboardComponent } from './aod-feature-dashboard.component';
import { AodFeatureDashboardModule } from './aod-feature-dashboard.module';

describe('AodFeatureDashboardComponent', () => {
  let component: AodFeatureDashboardComponent;
  let fixture: ComponentFixture<AodFeatureDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MockModule(AodFeatureDashboardModule)],
      declarations: [ AodFeatureDashboardComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AodFeatureDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
