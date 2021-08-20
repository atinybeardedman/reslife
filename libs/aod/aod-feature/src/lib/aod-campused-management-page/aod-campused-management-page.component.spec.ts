import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AodSignoutDataService, SharedAodDataService } from '@reslife/aod-data-access';
import { MockModule, MockProvider } from 'ng-mocks';

import { AodCampusedManagementPageComponent } from './aod-campused-management-page.component';
import { AodCampusedManagementPageModule } from './aod-campused-management-page.module';

describe('AodCampusedManagementPageComponent', () => {
  let component: AodCampusedManagementPageComponent;
  let fixture: ComponentFixture<AodCampusedManagementPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AodCampusedManagementPageComponent ],
      imports: [
        MockModule(AodCampusedManagementPageModule)
      ],
      providers: [
        MockProvider(SharedAodDataService),
        MockProvider(AodSignoutDataService),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
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
