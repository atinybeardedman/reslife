import { HarnessLoader, parallel } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ChangeDetectionStrategy, CUSTOM_ELEMENTS_SCHEMA, SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { carRestrictionTest } from '@reslife/student-signout-model';

import { OverridePermissionsFormComponent } from './override-permissions-form.component';
import { OverridePermissionsFormModule } from './override-permissions-form.module';
import { MatRadioGroupHarness} from '@angular/material/radio/testing';
import { MatInputHarness } from '@angular/material/input/testing';

describe('OverridePermissionsFormComponent', () => {
  let component: OverridePermissionsFormComponent;
  let fixture: ComponentFixture<OverridePermissionsFormComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverridePermissionsFormModule, NoopAnimationsModule],
      declarations: [ OverridePermissionsFormComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .overrideComponent(OverridePermissionsFormComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default },
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverridePermissionsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when it renders', () => {

    beforeEach(() => {
      component.permissions = carRestrictionTest.permissions;
      component.ngOnChanges({
        permissions: new SimpleChange(null, carRestrictionTest.permissions, true)
      });
      fixture.detectChanges();
    })
    it('should render the select student\'s current permissions', async () => {
      const radios = await loader.getAllHarnesses(MatRadioGroupHarness);
      expect(await parallel(() => radios.map(r => r.getCheckedValue()))).toEqual([
        ''+component.permissions.canWalk,
        ''+component.permissions.canBike,
        ''+component.permissions.canCar
      ]);
      const carRestriction = await loader.getHarness(MatInputHarness);
      expect(await carRestriction.getValue()).toBe(component.permissions.carRestriction);
    })

    it('should emit the permissions on every change', async () => {
      const spy = jest.spyOn(component.permissionsChange, 'emit');
      const walkGroup = await loader.getHarness(MatRadioGroupHarness);
      const buttons = await walkGroup.getRadioButtons();
      await buttons[1].check();
      fixture.detectChanges();
      expect(spy).toHaveBeenLastCalledWith({
        ...component.permissions,
        canWalk: false
      });
    });

  })

});
