import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFeatureDashboardComponent } from './admin-feature-dashboard.component';

describe('AdminFeatureDashboardComponent', () => {
  let component: AdminFeatureDashboardComponent;
  let fixture: ComponentFixture<AdminFeatureDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminFeatureDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFeatureDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
