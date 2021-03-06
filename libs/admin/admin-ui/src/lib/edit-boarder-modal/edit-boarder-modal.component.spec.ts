import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { EditBoarderModalComponent } from './edit-boarder-modal.component';

import { HarnessLoader, parallel } from '@angular/cdk/testing';
import {
  ChangeDetectionStrategy,
  CUSTOM_ELEMENTS_SCHEMA,
  SimpleChange,
} from '@angular/core';
import { EditBoarderModalModule } from './edit-boarder-modal.module';
import { testBoarder } from '@reslife/shared-models';
import { MatFormFieldHarness } from '@angular/material/form-field/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import { MatSelectHarness } from '@angular/material/select/testing';
import { MatRadioGroupHarness } from '@angular/material/radio/testing';
import { getDateFromDatestring } from '@reslife/utils';


describe('EditBoarderModalComponent', () => {
  let component: EditBoarderModalComponent;
  let fixture: ComponentFixture<EditBoarderModalComponent>;
  let loader: HarnessLoader;

 
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, EditBoarderModalModule],
      declarations: [EditBoarderModalComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .overrideComponent(EditBoarderModalComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBoarderModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  afterEach(() => {
    fixture.destroy();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the title', () => {
    expect(fixture.nativeElement.querySelector('h1').textContent).toContain(
      'New Boarder'
    );
    component.title = 'Edit Boarder';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('h1').textContent).toContain(
      'Edit Boarder'
    );
  });

  it('should show the approriate fields', async () => {
    const fields = await loader.getAllHarnesses(MatFormFieldHarness);
    const labels = await parallel(() => fields.map((f) => f.getLabel()));
    expect(labels).toEqual([
      'First Name *',
      'Last Name *',
      'Email *',
      'Dorm *',
      'Board Type *',
      'Start date *',
      'End date *'
    ]);
  });
  it('should fill the fields if data is provided', async () => {
    
    component.boarder = testBoarder;
    component.dorms = ['Newlin', 'Reagan'];
    fixture.detectChanges();
    component.ngOnChanges({
      boarder: new SimpleChange(null, testBoarder, false),
    });
    const inputs = await loader.getAllHarnesses(MatInputHarness);
    const selects = await loader.getAllHarnesses(MatSelectHarness);
    const radioGroups = await loader.getAllHarnesses(MatRadioGroupHarness);
    const inputValues = await parallel(() => inputs.map((i) => i.getValue()));
    const selectValues = await parallel(() =>
      selects.map((s) => s.getValueText())
    );
    const radioValues = await parallel(() => radioGroups.map(r => r.getCheckedValue()));

    expect(inputValues).toEqual([
      testBoarder.firstName,
      testBoarder.lastName,
      testBoarder.email.replace('@oakwoodfriends.org', ''),
      getDateFromDatestring(testBoarder.startDate).toLocaleDateString('en-US'),
      getDateFromDatestring(testBoarder.endDate).toLocaleDateString('en-US'),
      testBoarder.permissions.carRestriction
    ]);
    expect(selectValues).toEqual([testBoarder.dorm, testBoarder.type]);
    expect(radioValues).toEqual(["true", "false" ,"true"]);
  });
});
