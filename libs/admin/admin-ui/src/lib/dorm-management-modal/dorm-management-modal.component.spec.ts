import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DormManagementModalComponent } from './dorm-management-modal.component';

describe('DormManagementModalComponent', () => {
  let component: DormManagementModalComponent;
  let fixture: ComponentFixture<DormManagementModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DormManagementModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DormManagementModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
