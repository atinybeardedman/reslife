import { Component,  ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { AcademicYear } from '@reslife/admin-model';
import { getAcademicYear, incrementAcademicYear } from '@reslife/utils';

@Component({
  selector: 'reslife-academic-year-picker',
  templateUrl: './academic-year-picker.component.html',
  styleUrls: ['./academic-year-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AcademicYearPickerComponent  {
  @Input() yearDocs!: AcademicYear[] | null;
  @Output() yearSelected = new EventEmitter<AcademicYear>();
  addedYears: string[] = [];
  selectedYear!: string;

  get years(): string[] {
    let list:string[] = [];
    if(this.yearDocs){
      list = [...this.yearDocs.map(d => d.name)]; 
    }
    if(this.addedYears){
      list = [...list, ...this.addedYears]
    }
    return list
  }

  addYear(): void {
    let newYear: string;
    if(this.years && this.years.length > 0){
      const year = this.years.pop() as string;
      newYear = incrementAcademicYear(year)
    } else {
      newYear = getAcademicYear();
    }
    this.addedYears.push(newYear);
    this.selectYear(newYear);
  }

  selectYear(year: string): void {
    this.selectedYear = year;
    let academicYear: AcademicYear | undefined;
    if(this.yearDocs){
      academicYear = this.yearDocs.find(d => d.name === year);
    }
    if(typeof academicYear === 'undefined'){
      academicYear = {
        name: year,
        uid: year,
        start: '',
        end: '',
      }
    }
    this.yearSelected.emit(academicYear);
  }

}
