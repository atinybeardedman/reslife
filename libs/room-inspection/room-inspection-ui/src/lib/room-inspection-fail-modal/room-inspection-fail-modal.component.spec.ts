import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RoomInspectionFailModalComponent } from './room-inspection-fail-modal.component';
import { RoomInspectionFailModalModule } from './room-inspection-fail-modal.module';
import { HarnessLoader, parallel } from '@angular/cdk/testing';
import { failedInspectionDoc } from '@reslife/room-inspection-model';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatFormFieldHarness } from '@angular/material/form-field/testing';
import { MatInputHarness } from '@angular/material/input/testing';

describe('RoomInspectionFailModalComponent', () => {
  let component: RoomInspectionFailModalComponent;
  let fixture: ComponentFixture<RoomInspectionFailModalComponent>;
  let loader: HarnessLoader;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        RoomInspectionFailModalModule
      ],
      declarations: [ RoomInspectionFailModalComponent ]
    })
    .overrideComponent(RoomInspectionFailModalComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default },
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomInspectionFailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('When a doc is given',() => {
    beforeEach(() =>{
      component.inspectionDoc = failedInspectionDoc;
      fixture.detectChanges();
    });
    it('should render the cancel and save buttons', async () => {
      const buttons = await loader.getAllHarnesses(MatButtonHarness);
      expect(buttons).toHaveLength(2);
      expect(await parallel(() => buttons.map(b => b.getText()))).toEqual(['Cancel', 'Save'])
    });
    it('should show the option failure reason input', async () => {
      const field = await loader.getHarness(MatFormFieldHarness);
      expect(await field.getLabel()).toBe('Reason for Failure');
      const inputs = await loader.getAllHarnesses(MatInputHarness);
      expect(inputs).toHaveLength(1);
    });
    it('should emit the final document when the button is clicked', async () => {
      const spy = jest.spyOn(component.save, 'emit');
      const button = await loader.getHarness(MatButtonHarness.with({text: 'Save'}));
      await button.click();
      fixture.detectChanges();
      expect(spy).toHaveBeenCalledWith(failedInspectionDoc);

      const input = await loader.getHarness(MatInputHarness);
      await input.setValue('Trash');
      await button.click();
      fixture.detectChanges();
      expect(spy).toHaveBeenCalledWith({...failedInspectionDoc, note: 'Trash'});
    });
  })


});
