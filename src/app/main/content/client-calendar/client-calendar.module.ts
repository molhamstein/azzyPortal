import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CalendarModule } from '../../../angular-calendar';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { JsonService } from '../calendar/json.service';
import { MatIconModule } from '@angular/material';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../../../core/modules/material.module';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../../../core/modules/shared.module';
import { ClientCalendarComponent } from './client-calendar/client-calendar.component';


const routes = [{
  path: 'client-calendar',
  component: ClientCalendarComponent,
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
  declarations: [ClientCalendarComponent,],
  providers:[JsonService],
  entryComponents: []

})
export class MyClientCalendarModule { }
