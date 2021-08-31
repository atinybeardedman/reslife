import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestLoginPageComponent } from './request-login-page.component';

describe('RequestLoginPageComponent', () => {
  let component: RequestLoginPageComponent;
  let fixture: ComponentFixture<RequestLoginPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestLoginPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestLoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
