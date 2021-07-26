import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CheckInChoiceComponent} from './check-in-choice.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
    declarations: [CheckInChoiceComponent],
    imports: [
        CommonModule,
        MatCardModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatSelectModule,
        MatInputModule,
        MatNativeDateModule,
        FlexLayoutModule
    ],
    exports: [CheckInChoiceComponent]
})
export class CheckInChoiceModule {}