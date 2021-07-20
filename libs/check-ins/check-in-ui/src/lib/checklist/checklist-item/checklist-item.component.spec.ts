import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';

import { ChecklistItemComponent } from './checklist-item.component';
import {MatButtonHarness} from '@angular/material/button/testing';
import { SharedUiModule } from '@reslife/shared/ui'

import {HarnessLoader} from '@angular/cdk/testing';
describe('ChecklistItemComponent', () => {
  let component: ChecklistItemComponent;
  let fixture: ComponentFixture<ChecklistItemComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedUiModule],
      declarations: [ ChecklistItemComponent ]
    })
    .overrideComponent(ChecklistItemComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default }
    })
    .compileComponents();
    fixture = TestBed.createComponent(ChecklistItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when it renders', () => {
    let button: MatButtonHarness;
    beforeEach(async () => {
      component.icon = 'check';
      component.item = {
        name: 'Test Name',
        uid: '1234'
      };
      fixture.detectChanges();
      button = await loader.getHarness(MatButtonHarness);
    });
    it('should render the name and icon button', async () => {
      expect(fixture.nativeElement.querySelector('.name').textContent).toBe(component.item.name);
      const text = await button.getText();
      expect(text).toBe(component.icon);
    });
    it('should emit the item when the button is clicked', async () => {
      const spy = jest.spyOn(component.action, 'emit');
      await button.click();
      fixture.detectChanges();
      expect(spy).toHaveBeenCalledWith(component.item);

    })

  })

});
