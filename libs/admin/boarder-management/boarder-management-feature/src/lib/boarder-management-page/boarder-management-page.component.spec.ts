import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HarnessLoader } from '@angular/cdk/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatButtonModule } from '@angular/material/button';

import { BoarderManagementPageComponent } from './boarder-management-page.component';
import { ChangeDetectionStrategy, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BoarderManagementService } from '@reslife/admin-data-access';
jest.mock('@reslife/admin-data-access');
import { testBoarder } from '@reslife/shared-models';
import { of } from 'rxjs';
import { MatDialogModule } from '@angular/material/dialog';

// const mockedBoarderManagementService = BoarderManagementService  as jest.MockedClass<typeof BoarderManagementService>;


describe('BoarderManagementPageComponent', () => {
  let component: BoarderManagementPageComponent;
  let fixture: ComponentFixture<BoarderManagementPageComponent>;
  let loader: HarnessLoader;
  let service: BoarderManagementService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoarderManagementPageComponent ],
      imports: [
        MatButtonModule,
        MatDialogModule
      ],
      providers: [BoarderManagementService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .overrideComponent(BoarderManagementPageComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default },
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoarderManagementPageComponent);
    service = TestBed.inject(BoarderManagementService);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the add boarder button', async () => {
    const button = await loader.getHarness(MatButtonHarness.with({text: '+ Add Boarder'}));
    expect(button).toBeTruthy();
  });

  describe('if there are boarders', () => {
    let spy;
    beforeEach(() => {
      spy = jest.spyOn(service, 'getActiveBoarders').mockImplementation(() => of([testBoarder]));
    })
    it('should display the boarders-table component', () => {
      expect(fixture.nativeElement.querySelector('reslife-manage-boarders-table')).toBeTruthy();
    });
  
    // it('should show the add boarder pop-up when clicking the button', () => {});
  
    // it('should show the edit boarder pop-up when the boarders-table component emits', () => {});
  
    // it('should show a confirmation dialog when removing a boarder', () => {});
  });

  })
