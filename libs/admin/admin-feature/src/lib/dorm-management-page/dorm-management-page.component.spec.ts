import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DormManagementPageComponent } from './dorm-management-page.component';

describe('DormManagementPageComponent', () => {
  let component: DormManagementPageComponent;
  let fixture: ComponentFixture<DormManagementPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DormManagementPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DormManagementPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
