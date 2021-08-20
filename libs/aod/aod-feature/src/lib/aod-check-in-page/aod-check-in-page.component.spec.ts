import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AodCheckInService, SharedAodDataService } from '@reslife/aod-data-access';
import { MockProvider } from 'ng-mocks';

import { AodCheckInPageComponent } from './aod-check-in-page.component';
import { AodCheckInPageModule } from './aod-check-in-page.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
describe('AodCheckInPageComponent', () => {
  let component: AodCheckInPageComponent;
  let fixture: ComponentFixture<AodCheckInPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AodCheckInPageComponent ],
      imports: [
        AodCheckInPageModule,
        NoopAnimationsModule
      ],
      providers: [MockProvider(AodCheckInService), MockProvider(SharedAodDataService)],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AodCheckInPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
