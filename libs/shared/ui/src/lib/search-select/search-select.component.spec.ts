import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HarnessLoader } from '@angular/cdk/testing';
import { SearchSelectComponent } from './search-select.component';
import { ChangeDetectionStrategy, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { MatIconHarness } from '@angular/material/icon/testing';
import { MatAutocompleteHarness } from '@angular/material/autocomplete/testing';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatFormFieldHarness } from '@angular/material/form-field/testing';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('SearchSelectComponent', () => {
  let component: SearchSelectComponent;
  let fixture: ComponentFixture<SearchSelectComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchSelectComponent],
      imports: [
        MatAutocompleteModule,
        MatInputModule,
        MatFormFieldModule,
        MatOptionModule,
        MatIconModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .overrideComponent(SearchSelectComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('inputs', () => {
    it('should render the search icon by default', async () => {
      const icon = await loader.getHarness(
        MatIconHarness.with({ selector: '[matSuffix]' })
      );
      expect(await icon.getName()).toBe('search');
    });
    it('should render icon input when passed', async () => {
      component.icon = 'check';
      fixture.detectChanges();
      const icon = await loader.getHarness(
        MatIconHarness.with({ selector: '[matSuffix]' })
      );
      expect(await icon.getName()).toBe('check');
    });

    it('should render the label if given', async () => {
      component.label = 'Student Name';
      fixture.detectChanges();
      const field = await loader.getAllHarnesses(MatFormFieldHarness.with({floatingLabelText: component.label}));
      expect(field).toHaveLength(1);
    })

    it('should render the list as the autocomplete options', async () => {
      component.list = [
        {
          name: 'a',
        },
        {
          name: 'ab',
        },
        {
          name: 'abc',
        },
      ];
      fixture.detectChanges();
      const autocomplete = await loader.getHarness(MatAutocompleteHarness);
      // BUG: autocomplete focus does not render any options
      await autocomplete.enterText('a');
      const options = await autocomplete.getOptions();
      expect(options.length).toBe(component.list.length);
      expect(await options[0].getText()).toBe(component.list[0].name);
    });
  });

  describe('actions', () => {
    let autocomplete: MatAutocompleteHarness;
    beforeEach(async () => {
      component.list = [
        {
          name: 'a',
        },
        {
          name: 'b',
        },
        {
          name: 'ac',
        },
      ];
      fixture.detectChanges();
      autocomplete = await loader.getHarness(MatAutocompleteHarness);
    });
    it('should filter options as the user types', async () => {
      await autocomplete.enterText('a');
      expect(await autocomplete.getOptions()).toHaveLength(2);
      await autocomplete.enterText('c');
      expect(await autocomplete.getOptions()).toHaveLength(1);
    });
    it('should clear input on selection by default', async () => {
      await autocomplete.enterText('a');
      await autocomplete.selectOption({ text: 'a' });
      expect(await autocomplete.getValue()).toBe('');
    });
    it('should not clear the input if clearOnSelect input is false', async () => {
      component.clearOnSelect = false;
      fixture.detectChanges();
      await autocomplete.enterText('a');
      await autocomplete.selectOption({ text: 'a' });
      expect(await autocomplete.getValue()).toBe('a');

    })
    it('should emit the item on selection', async () => {
      const spy = jest.spyOn(component.itemSelected, 'emit');
      await autocomplete.enterText('a');
      await autocomplete.selectOption({ text: 'a' });
      fixture.detectChanges();
      expect(spy).toHaveBeenCalledWith(component.list[0]);
    });
  });
});
