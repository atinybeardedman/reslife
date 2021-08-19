import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AodCampusedManagementPageComponent } from './aod-campused-management-page.component';

describe('AodCampusedManagementPageComponent', () => {
  let component: AodCampusedManagementPageComponent;
  let fixture: ComponentFixture<AodCampusedManagementPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AodCampusedManagementPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AodCampusedManagementPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
