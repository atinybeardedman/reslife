import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ChangeDetectionStrategy, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatFormFieldHarness } from '@angular/material/form-field/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import { MatSelectHarness } from '@angular/material/select/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { allPermissionsTest, carRestrictionTest, partialPermissionsTest } from '@reslife/student-signout-model';

import { OneTimeSignoutFormComponent } from './one-time-signout-form.component';
import { OneTimeSignoutFormModule } from './one-time-signout-form.module';

describe('OneTimeSignoutFormComponent', () => {
  let component: OneTimeSignoutFormComponent;
  let fixture: ComponentFixture<OneTimeSignoutFormComponent>;
  let loader: HarnessLoader;

  beforeAll(() => {
    jest.useFakeTimers('modern');
    jest.setSystemTime(new Date(2021, 8, 1, 8, 0, 0, 0));

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        // addListener: jest.fn(), // deprecated
        // removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });
  afterAll(() => {
    jest.useRealTimers();
  });
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OneTimeSignoutFormComponent],
      imports: [OneTimeSignoutFormModule, NoopAnimationsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .overrideComponent(OneTimeSignoutFormComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OneTimeSignoutFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the form controls', async () => {
    component.signoutMeta = allPermissionsTest;
    fixture.detectChanges();
    const fields = await loader.getAllHarnesses(MatFormFieldHarness);
    expect(fields).toHaveLength(2);
  });

  it('should output the signout when the form is valid', async () => {
    const spy = jest.spyOn(component.signout, 'emit');
    component.signoutMeta = partialPermissionsTest;
    fixture.detectChanges();
    const destinationInput = await loader.getHarness(MatInputHarness);
    const transport = await loader.getHarness(MatSelectHarness);

    await destinationInput.setValue('Starbucks');
    await transport.open();
    await transport.clickOptions({text: 'Walk'});
    fixture.detectChanges();
    expect(spy).toHaveBeenLastCalledWith({
      student: {
        name: partialPermissionsTest.name,
        uid: partialPermissionsTest.uid
      },
      destination: 'Starbucks',
      transport: 'Walk',
      isCurrentlyOut: true,
      timeOut: new Date().toISOString(),
      uid: ''
    })

    
  });

  describe('When car is selected', () => {
    beforeEach(async () => {
      component.signoutMeta = carRestrictionTest;
      fixture.detectChanges();
      const destinationInput = await loader.getHarness(MatInputHarness);
      const transport = await loader.getHarness(MatSelectHarness);

      await destinationInput.setValue('Starbucks');
      await transport.open();
      await transport.clickOptions({text: 'Car'});
      fixture.detectChanges();

    })
    it('should show the which car field', async () => {
      const carField = await loader.getAllHarnesses(MatFormFieldHarness.with({floatingLabelText: 'Which Car? *'}));
      expect(carField).toHaveLength(1);
    });
    it('should show if the boarder has a restriction', async () => {
      const carField = await loader.getHarness(MatFormFieldHarness.with({floatingLabelText: 'Which Car? *'}));
      expect(await carField.getTextHints()).toContain(carRestrictionTest.permissions.carRestriction)
    });

  })
});
