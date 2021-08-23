import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DormManagementFeatureComponent } from './dorm-management-feature.component';

describe('DormManagementFeatureComponent', () => {
  let component: DormManagementFeatureComponent;
  let fixture: ComponentFixture<DormManagementFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DormManagementFeatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DormManagementFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
