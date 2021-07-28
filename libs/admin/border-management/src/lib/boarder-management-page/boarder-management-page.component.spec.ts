import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HarnessLoader } from '@angular/cdk/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatButtonModule } from '@angular/material/button';

import { BoarderManagementPageComponent } from './boarder-management-page.component';
import { ChangeDetectionStrategy, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('BoarderManagementPageComponent', () => {
  let component: BoarderManagementPageComponent;
  let fixture: ComponentFixture<BoarderManagementPageComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoarderManagementPageComponent ],
      imports: [
        MatButtonModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .overrideComponent(BoarderManagementPageComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default },
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoarderManagementPageComponent);
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

  it('should display the boarders-table component', () => {});

  it('should show the add boarder pop-up when clicking the button', () => {});

  it('should show the edit boarder pop-up when the boarders-table component emits', () => {});

  it('should show a confirmation dialog when removing a boarder', () => {});
});
