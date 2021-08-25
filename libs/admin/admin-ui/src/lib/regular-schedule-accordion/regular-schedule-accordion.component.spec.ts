import { HarnessLoader, parallel } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { RegularScheduleAccordionComponent } from './regular-schedule-accordion.component';
import { RegularScheduleAccordionModule } from './regular-schedule-accordion.module';
import { MatExpansionPanelHarness } from '@angular/material/expansion/testing'
import { DAYNAMES, testDinnerScheduleItem, testBrunchScheduleItem } from '@reslife/admin-model';
import { MatButtonHarness } from '@angular/material/button/testing';

describe('RegularScheduleAccordionComponent', () => {
  let component: RegularScheduleAccordionComponent;
  let fixture: ComponentFixture<RegularScheduleAccordionComponent>;
  let loader: HarnessLoader;



  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        RegularScheduleAccordionModule
      ],
      declarations: [ RegularScheduleAccordionComponent ]
    })
    .overrideComponent(RegularScheduleAccordionComponent, {
      set: {
        changeDetection: ChangeDetectionStrategy.Default
      }
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegularScheduleAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render each of the days', async () => {
    const panels = await loader.getAllHarnesses(MatExpansionPanelHarness);
    expect(panels).toHaveLength(7);
    expect(await parallel(() => panels.map(p => p.getTitle()))).toEqual(DAYNAMES);
  });

  it('should render the schedule given in each panel', async () => {
    component.scheduleItems = [testBrunchScheduleItem, testDinnerScheduleItem];
    fixture.detectChanges();

    const panels = await loader.getAllHarnesses(MatExpansionPanelHarness);
    const contentList = await parallel(() => panels.map(p => p.getTextContent()));
    for(const content of contentList){
      expect(content).toContain(testDinnerScheduleItem.name);
      expect(content).toContain('edit');
      expect(content).toContain('delete');
    }

    const weekendContent = [contentList[0], contentList[6]];
    const weekDayContent = contentList.slice(1,6);
    for(const content of weekendContent) {
      expect(content).toContain(testBrunchScheduleItem.name);
    }

    for(const content of weekDayContent){
      expect(content).not.toContain(testBrunchScheduleItem.name);
    }

  });

  it('should emit the schedule item when actions are clicked', async () => {
    const editSpy = jest.spyOn(component.edit, 'emit');
    const deleteSpy = jest.spyOn(component.delete, 'emit');

    component.scheduleItems = [testBrunchScheduleItem];
    fixture.detectChanges();

    const panel = await loader.getHarness(MatExpansionPanelHarness);
    await panel.expand();
    const [editButton, deleteButton] = await panel.getAllHarnesses(MatButtonHarness);

    await editButton.click();
    fixture.detectChanges();
    expect(editSpy).toHaveBeenCalledWith({
      record: testBrunchScheduleItem,
      action: 'edit'
    });

    await deleteButton.click();
    fixture.detectChanges();
    expect(deleteSpy).toHaveBeenCalledWith({
      record: testBrunchScheduleItem,
      action: 'delete'
    });



  });
});
