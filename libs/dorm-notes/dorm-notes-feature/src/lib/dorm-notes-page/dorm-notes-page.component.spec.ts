import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DormNotesPageComponent } from './dorm-notes-page.component';
import { MockModule, MockProvider } from 'ng-mocks';
import { DormNotesUiModule } from '@reslife/dorm-notes-ui';
import { SharedUiModule } from '@reslife/shared/ui';
import { DormNotesDataService } from '@reslife/dorm-notes-data-access';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
describe('DormNotesPageComponent', () => {
  let component: DormNotesPageComponent;
  let fixture: ComponentFixture<DormNotesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DormNotesPageComponent],
      imports: [MockModule(SharedUiModule), MockModule(DormNotesUiModule)],
      providers: [MockProvider(DormNotesDataService)],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DormNotesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
