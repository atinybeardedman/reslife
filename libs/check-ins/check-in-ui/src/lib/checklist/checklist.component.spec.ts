import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatListHarness } from '@angular/material/list/testing';
import { MatCardHarness } from '@angular/material/card/testing';
import { MatDividerHarness } from '@angular/material/divider/testing';

import { HarnessLoader } from '@angular/cdk/testing';
import { ChecklistComponent } from './checklist.component';
import { ChecklistItemComponent } from '../checklist/checklist-item/checklist-item.component';
import { ChangeDetectionStrategy, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
describe('ChecklistComponent', () => {
  let component: ChecklistComponent;
  let fixture: ComponentFixture<ChecklistComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        MatListModule
      ],
      declarations: [ChecklistComponent, ChecklistItemComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .overrideComponent(ChecklistComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when it renders', () => {
    beforeEach(() => {
      component.items = [
        {
          name: 'Test 1',
          uid: '1'
        },
        {
          name: 'Test 2',
          uid: '2'
        },
        {
          name: 'Test 3',
          uid: '3'
        },
      ];
      fixture.detectChanges();
    });
    it('should render a mat-list of items', async () => {
      const list = await loader.getHarness(MatListHarness);
      const items = await list.getItems();
      const text = await items[0].getText();
      expect(text).toContain(component.items[0].name);
      expect(text).toContain(component.icon);
      expect(items.length).toBe(component.items.length);
    });
    it('Should render the title and number of items in the list', async () => {
      const card = await loader.getHarness(MatCardHarness);
      let titleText = await card.getTitleText();
      expect(titleText).toContain('To Check');
      expect(titleText).toContain(component.items.length.toString());
      component.type = 'Checked In';
      fixture.detectChanges();
      titleText = await card.getTitleText();
      expect(titleText).toContain('Checked In');
    });
  });
});
