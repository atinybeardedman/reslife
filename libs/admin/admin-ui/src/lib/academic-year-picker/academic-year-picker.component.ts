import { Component,  ChangeDetectionStrategy, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AcademicYear } from '@reslife/admin-model';
import { getAcademicYear, incrementAcademicYear } from '@reslife/utils';
import { NewAcademicYearModalComponent } from '../new-academic-year-modal/new-academic-year-modal.component';

@Component({
  selector: 'reslife-academic-year-picker',
  templateUrl: './academic-year-picker.component.html',
  styleUrls: ['./academic-year-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AcademicYearPickerComponent implements OnChanges {
  @Input() yearDocs!: AcademicYear[] | null;
  @Output() yearSelected = new EventEmitter<AcademicYear>();
  addedYears: string[] = [];
  selectedYear!: string;

  constructor(private dialog: MatDialog){}

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.yearDocs && this.yearDocs){
      const currentYear = getAcademicYear();
      const currentYearDoc = this.yearDocs.find(y => y.name === currentYear);
      if(typeof currentYearDoc !== 'undefined'){
        this.selectYear(currentYear);
      } else if (this.yearDocs.length !== 0){
        this.selectYear(this.yearDocs[this.yearDocs.length - 1].name);
      }
    }
  }

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

  async addYear(): Promise<void> {
    let newYear: string;
    if(this.years && this.years.length > 0){
      const year = this.years.pop() as string;
      newYear = incrementAcademicYear(year)
    } else {
      newYear = getAcademicYear();
    }
    const result = await this.dialog.open(NewAcademicYearModalComponent).afterClosed().toPromise();
    if(result === true){
      this.addedYears.push(newYear);
      this.selectYear(newYear);
    }
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
