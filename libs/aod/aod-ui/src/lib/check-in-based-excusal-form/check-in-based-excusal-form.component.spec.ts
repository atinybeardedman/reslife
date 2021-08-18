import { ChangeDetectionStrategy, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HarnessLoader, parallel } from '@angular/cdk/testing';
import { CheckInBasedExcusalFormComponent } from './check-in-based-excusal-form.component';
import { CheckInBasedExcusalFormModule } from './check-in-based-excusal-form.module';
import { MatSelectionListHarness } from '@angular/material/list/testing';

describe('CheckInBasedExcusalFormComponent', () => {
  let component: CheckInBasedExcusalFormComponent;
  let fixture: ComponentFixture<CheckInBasedExcusalFormComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckInBasedExcusalFormComponent ],
      imports: [CheckInBasedExcusalFormModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .overrideComponent(CheckInBasedExcusalFormComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default },
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckInBasedExcusalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('When checkins are provided', () => {
    let list: MatSelectionListHarness;
    beforeEach(async () => {
      component.checkins = ['Brunch', 'Dinner', 'Dorm'];
      fixture.detectChanges();
      list = await loader.getHarness(MatSelectionListHarness);

    })
    it('should render options for the check-in list given', async () => {
      const items = await list.getItems();
      expect(items).toHaveLength(component.checkins.length);
      expect(await parallel(() => items.map(i => i.getText()))).toEqual(component.checkins);
    });
    it('should emit the selected check ins selected on change', async () => {
      const spy = jest.spyOn(component.selectedCheckins, 'emit');
      await list.selectItems({text: component.checkins[0]});
      fixture.detectChanges();
      expect(spy).toHaveBeenCalledWith([component.checkins[0]]);

    });
  })

});
