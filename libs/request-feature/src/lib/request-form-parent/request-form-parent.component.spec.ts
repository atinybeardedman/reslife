import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestFormParentComponent } from './request-form-parent.component';

describe('RequestFormParentComponent', () => {
  let component: RequestFormParentComponent;
  let fixture: ComponentFixture<RequestFormParentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestFormParentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestFormParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
