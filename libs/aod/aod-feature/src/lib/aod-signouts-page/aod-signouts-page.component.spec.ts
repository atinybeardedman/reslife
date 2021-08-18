import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AodSignoutsPageComponent } from './aod-signouts-page.component';

describe('AodSignoutsPageComponent', () => {
  let component: AodSignoutsPageComponent;
  let fixture: ComponentFixture<AodSignoutsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AodSignoutsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AodSignoutsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
