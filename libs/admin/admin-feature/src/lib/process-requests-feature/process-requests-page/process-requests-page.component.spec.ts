import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessRequestsPageComponent } from './process-requests-page.component';

describe('ProcessRequestsPageComponent', () => {
  let component: ProcessRequestsPageComponent;
  let fixture: ComponentFixture<ProcessRequestsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessRequestsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessRequestsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
