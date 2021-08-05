import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CheckInItem} from '@reslife/check-ins/check-in-model';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { NamedItem } from '@reslife/shared-models';
@Component({
  selector: 'reslife-search-select',
  templateUrl: './search-select.component.html',
  styleUrls: ['./search-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchSelectComponent implements OnInit {
  @Input() list!: NamedItem[] | null;
  @Input() icon = 'search';
  @Input() clearOnSelect = true;
  @Output() itemSelected = new EventEmitter<NamedItem>();
  autoControl = new FormControl();
  filteredOptions$!: Observable<NamedItem[]>;

  ngOnInit() {
    this.filteredOptions$ = this.autoControl.valueChanges.pipe(
      startWith(''),
      map((value) => (typeof value === 'string' ? value : value.name)),
      map((value) =>
        this.list
          ? this.list.filter((item) =>
              item.name.toLowerCase().includes(value.toLowerCase())
            )
          : []
      )
    );
  }

  onSelected(selected: MatAutocompleteSelectedEvent): void {
    this.itemSelected.emit(selected.option.value);
    if(this.clearOnSelect){
      this.autoControl.setValue('');
    }
  }

  displayFn(item: CheckInItem) {
    return item ? item.name : '';
  }
}
