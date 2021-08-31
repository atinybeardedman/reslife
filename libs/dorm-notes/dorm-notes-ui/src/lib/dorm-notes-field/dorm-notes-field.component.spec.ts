import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HarnessLoader } from '@angular/cdk/testing';
import {
  ChangeDetectionStrategy,
  CUSTOM_ELEMENTS_SCHEMA,
  SimpleChange,
} from '@angular/core';

import { DormNotesFieldComponent } from './dorm-notes-field.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatExpansionPanelHarness } from '@angular/material/expansion/testing';
import { TextFieldModule } from '@angular/cdk/text-field';
import {
  uninitializedField,
  filledField,
  lockedField,
} from '@reslife/dorm-notes-model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputHarness } from '@angular/material/input/testing';
describe('DormNotesFieldComponent', () => {
  let component: DormNotesFieldComponent;
  let fixture: ComponentFixture<DormNotesFieldComponent>;
  let loader: HarnessLoader;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DormNotesFieldComponent],
      imports: [
        MatFormFieldModule,
        MatExpansionModule,
        MatInputModule,
        TextFieldModule,
        FormsModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .overrideComponent(DormNotesFieldComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DormNotesFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('When field is uninitialized', () => {
    let panel: MatExpansionPanelHarness;
    beforeEach(async () => {
      component.field = uninitializedField;
      component.ngOnChanges({
        field: new SimpleChange(null, component.field, true),
      });
      fixture.detectChanges();
      panel = await loader.getHarness(MatExpansionPanelHarness);
    });
    it('should render the title of the field', async () => {
      const label = await panel.getTitle();
      expect(label).toBe(uninitializedField.fieldName);
    });

    it('should emit the update event when typed in', fakeAsync(async () => {
      const spy = jest.spyOn(component.updatedField, 'emit');
      const textarea = await loader.getHarness(MatInputHarness);
      textarea.setValue('Example dorm note');
      tick(1000);
      expect(spy).toHaveBeenCalledWith({
        ...component.field,
        note: 'Example dorm note',
      });
    }));
  });

  describe('When field is already filled', () => {
   
    let panel: MatExpansionPanelHarness;
    beforeEach(async () => {
      component.field = filledField;
      component.ngOnChanges({
        field: new SimpleChange(null, component.field, true),
      });
      fixture.detectChanges();
     
      panel = await loader.getHarness(MatExpansionPanelHarness);
    });
    it('should render the textfield with the content provided', async () => {
      const textarea = await loader.getHarness(MatInputHarness);
      expect(await textarea.getValue()).toBe(filledField.note);
    });
    it('should render the author of the note', async () => {
      expect(await panel.getDescription()).toContain(
        'Updated by: ' + filledField.author
      );
    });
  });

  describe('When field is locked', () => {
    beforeEach(async () => {
      component.field = lockedField;
      component.ngOnChanges({
        field: new SimpleChange(null, component.field, true),
      });
      fixture.detectChanges();
    });
    it('should be disabled', async () => {
      const textarea = await loader.getHarness(MatInputHarness);
      expect(await textarea.isDisabled()).toBeTruthy();
    });
  });
});
