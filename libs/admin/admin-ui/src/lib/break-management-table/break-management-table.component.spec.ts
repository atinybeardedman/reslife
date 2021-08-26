import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreakManagementTableComponent } from './break-management-table.component';

describe('BreakManagementTableComponent', () => {
  let component: BreakManagementTableComponent;
  let fixture: ComponentFixture<BreakManagementTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BreakManagementTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BreakManagementTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
