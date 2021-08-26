import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'reslife-academic-year-picker',
  templateUrl: './academic-year-picker.component.html',
  styleUrls: ['./academic-year-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AcademicYearPickerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
