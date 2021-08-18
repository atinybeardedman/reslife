import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AodFeatureDashboardComponent } from './aod-feature-dashboard.component';
import { AodFeatureDashboardModule } from './aod-feature-dashboard.module';

describe('AodFeatureDashboardComponent', () => {
  let component: AodFeatureDashboardComponent;
  let fixture: ComponentFixture<AodFeatureDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AodFeatureDashboardModule],
      declarations: [ AodFeatureDashboardComponent ]
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
