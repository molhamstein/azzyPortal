import { DialogServiceService } from './../../../../core/services/dialog-service.service';
import { ViewAppointmentComponent } from './../../dialogs/view-appointment/view-appointment.component';
import { FuseConfigService } from './../../../../core/services/config.service';
import { ActivatedRoute } from '@angular/router';
import { MainService } from './../../../../core/services/main.service';
import { Component, OnInit } from '@angular/core';
import { CalendarMonthViewDay } from '../../../../angular-calendar';
import { CalendarEvent } from '../../../../angular-calendar';
import { colors } from '../../calendar/colors';
import { JsonService } from '../../calendar/json.service';
import * as cloneDeep from 'lodash/cloneDeep';

import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { TimeSlots } from '../../calendar/TimeSlots'
import { Subject } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { locale as english } from '../../languageFiles/en';
import { locale as persian } from '../../languageFiles/fa';

import { TranslateService } from '@ngx-translate/core';
import { FuseTranslationLoaderService } from '../../../../core/services/translation-loader.service';


@Component({
  selector: 'client-calendar',
  templateUrl: './client-calendar.component.html',
  styleUrls: ['./client-calendar.component.css'],
  styles: [
    `
    .cell-totals {
      margin: 5px;
      text-align: center;
    }
    .badge {
      margin-right: 5px;
    }
    /deep/ .datatable-body-row.active .datatable-row-group {
      color:white !important;

  `
  ]
})
export class ClientCalendarComponent implements OnInit {
  refresh: Subject<any> = new Subject();
  rows = [];
  selected: any;
  dialogRef: any;
  selectedDay: any;
  fuseSettings
  filterType = "month";
  constructor(private jsonServ: JsonService,
    public dialog: MatDialog,
    private mainServ: MainService,
    private route: ActivatedRoute,
    private translate: TranslateService,
    private fuseConfig: FuseConfigService,
    private translationLoader: FuseTranslationLoaderService,
    private dialogSer: DialogServiceService) {
    this.translationLoader.loadTranslations(english, persian);
    // this.rows = this.events;
    this.fuseSettings = this.fuseConfig.settings;
    this.fuseSettings.optionsBtn = 'none';
    this.fuseSettings.layout.navigation = 'none';
    this.fuseSettings.layout.toolbar = 'none';
    this.fuseSettings.layout.footer = 'none';

    this.fuseConfig.setSettings(this.fuseSettings);

  }

  colors = [
    {
      cons: 1,
      name: "Johnny Nakazi",
      color: {
        primary: "#4286f4",
        secondary: "white"
      },
    },
    {
      cons: 20,
      name: "Molham Mahmoud",
      color: {
        primary: "#f44d41",
        secondary: "white"
      },
    },
  ]
  consultants = [];
  title = 'app';
  view: string = 'month';
  // viewDate: Date = new Date();
  activeDayIsOpen: boolean = false;
  events: CalendarEvent[] = [];
  bodyevents: CalendarEvent[] = [];

  openEvents: CalendarEvent[] = [];
  flag: boolean = true;
  beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
    var style = document.createElement('style');
    style.type = 'text/css';
    body.forEach(cell => {
      cell.badgeTotal = 0;

      const groups: any = {};
      cell.events.forEach((event: CalendarEvent<{ consID: string, open: boolean }>) => {
        if (event.meta.open) {
          cell.badgeTotal += 1;
          groups[event.meta.consID] = groups[event.meta.consID] || [];
          groups[event.meta.consID].push(event);
          event.color = this.getColor(event.meta.consID);

        }
        else {
          event.color = { primary: "#cccccc", secondary: "black" };
        }

      });
      cell['eventGroups'] = Object.entries(groups);
      if (cell['eventGroups'].length > 0 && this.flag) {
        for (let index = 0; index < cell['eventGroups'].length; index++) {
          var xx = cell['eventGroups'][index][0]
          style.innerHTML += '.badge-' + xx + '{ background-color:' + this.getColor(xx).primary + '; color: white;}'
          this.flag = false;
        }
        document.getElementsByTagName('head')[0].appendChild(style);

      }
    });


  }



  getColor(cons) {
    for (let index = 0; index < this.colors.length; index++) {
      if (this.colors[index].cons == cons)
        return this.colors[index].color;
    }
  }

  buildTitle(cons, client, location, start, end) {
    var startMin = (new Date(start).getMinutes() < 10 ? '0' : '') + new Date(start).getMinutes();
    var endMin = (new Date(end).getMinutes() < 10 ? '0' : '') + new Date(end).getMinutes();

    return cons + ' - ' + client + ': ' + new Date(start).getHours() + ':' + startMin + ' - ' + new Date(end).getHours() + ':' + endMin + ' (' + location + ')';
  }


  checkSelectable(event) {
    return event.meta.open == true
  }




  allEvents = [];


  changeDayAnas(isMonth: boolean = true) {
    this.mainServ.loaderSer.display(true);

    let from = cloneDeep(this.viewDate)
    let to = cloneDeep(this.viewDate)
    if (isMonth) {
      from.setDate(1);
      to.setDate(this.daysInMonth(to.getMonth(), to.getFullYear()))
    }
    from.setHours(0);
    to.setHours(23);

    if (isMonth)
      this.events = [];
    this.bodyevents = [];
    if (this.allEvents[this.viewDate.getMonth() + "-" + this.viewDate.getFullYear()] == null || !isMonth) {
      this.mainServ.APIServ.get("consTimes/readCalander?ids=" + this.consId + "&dateStart=" + from + "&dateEnd=" + to).subscribe((data: any) => {
        if (this.mainServ.APIServ.getErrorCode() == 0) {
          if (isMonth)
            this.allEvents[this.viewDate.getMonth() + "-" + this.viewDate.getFullYear()] = [];
          var tempEvents;
          data['readCalander'][0]['slots'].forEach(element => {
            var x: CalendarEvent = {
              start: new Date(element.startDate),
              end: new Date(element.endDate),
              title: this.buildTitle(element.consId, element.clientId, element.location, element.startDate, element.endDate),
              meta: element,
            };
            if (isMonth) {
              this.events.push(x);
              this.allEvents[this.viewDate.getMonth() + "-" + this.viewDate.getFullYear()].push(x);
            }
            this.bodyevents.push(x);
          });
          this.mainServ.loaderSer.display(false);


        }
        else if (this.mainServ.APIServ.getErrorCode() == 400) {

        }
        else {
          this.mainServ.globalServ.somthingError();
        }

      });
    } else {
      this.events = this.allEvents[this.viewDate.getMonth() + "-" + this.viewDate.getFullYear()];
      this.mainServ.loaderSer.display(false);
    }
  }
  dayClicked(data) {
    this.viewDate = data['date'];
    this.changeDayAnas(false)
  }
  viewDate: Date = new Date();
  form;
  consId
  ngOnInit() {
    var id = this.route.snapshot.paramMap.get('id');
    this.mainServ.APIServ.get("forms/" + id).subscribe((data: any) => {
      if (this.mainServ.APIServ.getErrorCode() == 0) {
        this.form = data;
        this.consId = data['consId'];
        this.changeDayAnas()
      }
      else if (this.mainServ.APIServ.getErrorCode() == 400) {

      }
      else {
        this.mainServ.globalServ.somthingError();
      }

    });
  }

  daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }

  viewAppointment(appointment) {
    const dialogRef = this.dialog.open(ViewAppointmentComponent, {
      width: '500px',
      data: { 'appointment': appointment }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.useAppointment(appointment)
      }
    });
  }

  useAppointment(appointment) {
    var mainThis = this;
    this.dialogSer.confirmationMessage('are youe sure you want use  appointment at ' + appointment['start'] + 'in ' + appointment['meta']['location'], "forms/selectAp/" + this.form['id'], { 'apId': appointment['meta']['id'] }, false, function () {
      mainThis.changeDayAnas();
    }, "put")
  }
}
