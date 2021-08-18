import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AodCheckInPageComponent } from './aod-check-in-page.component';

describe('AodCheckInPageComponent', () => {
  let component: AodCheckInPageComponent;
  let fixture: ComponentFixture<AodCheckInPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AodCheckInPageComponent ]
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
