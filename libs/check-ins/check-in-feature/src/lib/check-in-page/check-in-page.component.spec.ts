import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckInDataService } from '@reslife/check-ins/check-in-data-access';
import { SharedUiModule } from '@reslife/shared/ui';

import { CheckInPageComponent } from './check-in-page.component';

describe('CheckInPageComponent', () => {
  let component: CheckInPageComponent;
  let fixture: ComponentFixture<CheckInPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedUiModule],
      declarations: [CheckInPageComponent],
      providers: [
        {
          provide: CheckInDataService,
          useValue: jest.mock('@reslife/check-ins/check-in-data-access'),
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckInPageComponent);
    TestBed.inject(CheckInDataService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
