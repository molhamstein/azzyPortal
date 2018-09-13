import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar.component';
import { RouterModule } from '@angular/router';
import { CalendarModule } from '../../../angular-calendar';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { JsonService } from './json.service';
import { MatIconModule } from '@angular/material';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../../../core/modules/material.module';
import { FuseCalendarEventFormDialogComponent } from './event-form/event-form.component';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../../../core/modules/shared.module';


const routes = [{
  path: 'calendar',
  component: CalendarComponent,
}];

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    CalendarModule.forRoot(),
    MaterialModule,
    ReactiveFormsModule,
    NgxMaterialTimepickerModule.forRoot(),
  ],
  declarations: [CalendarComponent,FuseCalendarEventFormDialogComponent],
  providers:[JsonService],
  entryComponents: [FuseCalendarEventFormDialogComponent]

})
export class MyCalendarModule { }