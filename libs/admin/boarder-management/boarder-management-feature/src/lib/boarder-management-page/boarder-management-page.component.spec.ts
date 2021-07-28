import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HarnessLoader } from '@angular/cdk/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatButtonModule } from '@angular/material/button';

import { BoarderManagementPageComponent } from './boarder-management-page.component';
import { ChangeDetectionStrategy, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BoarderManagementService } from '../boarder-management.service';
import { testBoarder } from '../../test-helpers/testValues';
import { of } from 'rxjs';

describe('BoarderManagementPageComponent', () => {
  let component: BoarderManagementPageComponent;
  let fixture: ComponentFixture<BoarderManagementPageComponent>;
  let loader: HarnessLoader;
  let service: jest.Mocked<BoarderManagementService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoarderManagementPageComponent ],
      imports: [
        MatButtonModule
      ],
      providers: [{
        provide: BoarderManagementService,
        useValue: jest.mock('../boarder-management.service')
      }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .overrideComponent(BoarderManagementPageComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default },
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoarderManagementPageComponent);
    service = TestBed.inject(BoarderManagementService) as jest.Mocked<BoarderManagementService>;
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
    beforeEach(() => {
    //   service.getActiveBoarders.mockReturnValue(of([
    //     testBoarder
    //   ]));
    })
    it('should display the boarders-table component', () => {
      expect(fixture.nativeElement.querySelector('reslife-manage-boarders-table')).toBeTruthy();
    });
  
    // it('should show the add boarder pop-up when clicking the button', () => {});
  
    // it('should show the edit boarder pop-up when the boarders-table component emits', () => {});
  
    // it('should show a confirmation dialog when removing a boarder', () => {});
  });

  })
