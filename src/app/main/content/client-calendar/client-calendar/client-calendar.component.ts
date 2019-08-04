import { CustomDateFormatter } from './custom-date-formatter.provider';
import { DatePipe } from '@angular/common';
import { DateFormatterParams } from './../../../../angular-calendar/modules/common/calendar-date-formatter.interface.d';
import { DialogServiceService } from './../../../../core/services/dialog-service.service';
import { ViewAppointmentComponent } from './../../dialogs/view-appointment/view-appointment.component';
import { FuseConfigService } from './../../../../core/services/config.service';
import { ActivatedRoute } from '@angular/router';
import { MainService } from './../../../../core/services/main.service';
import { Component, OnInit, ViewChild, Renderer2, AfterViewInit } from '@angular/core';
import { CalendarMonthViewDay, CalendarDateFormatter } from '../../../../angular-calendar';
import { CalendarEvent } from '../../../../angular-calendar';
import { colors } from '../../calendar/colors';
import { JsonService } from '../../calendar/json.service';
import * as cloneDeep from 'lodash/cloneDeep';

import * as moment from 'moment'; // add this 1 of 4

import 'moment-timezone';

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
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog, MatCalendar } from '@angular/material';
import { locale as english } from '../../languageFiles/en';
import { locale as persian } from '../../languageFiles/fa';

import { TranslateService } from '@ngx-translate/core';
import { FuseTranslationLoaderService } from '../../../../core/services/translation-loader.service';


@Component({
  selector: 'client-calendar',
  templateUrl: './client-calendar.component.html',
  styleUrls: ['./client-calendar.component.css'],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter
    }
  ],
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
export class ClientCalendarComponent implements AfterViewInit, OnInit {
  refresh: Subject<any> = new Subject();
  rows = [];
  selected: any;
  dialogRef: any;
  selectedDay: any;
  fuseSettings
  filterType = "month";
  token;
  // @ViewChild(MatCalendar) _datePicker: MatCalendar<Date>
  @ViewChild('calendar') calendar: MatCalendar<Date>;

  constructor(private jsonServ: JsonService,
    public dialog: MatDialog,
    private mainServ: MainService,
    private renderer: Renderer2,
    private route: ActivatedRoute,
    private translate: TranslateService,
    private fuseConfig: FuseConfigService,
    private translationLoader: FuseTranslationLoaderService,
    private dialogSer: DialogServiceService) {
    this.translationLoader.loadTranslations(english, persian);
    this.fuseSettings = this.fuseConfig.settings;
    this.fuseSettings.optionsBtn = 'none';
    this.fuseSettings.layout.navigation = 'none';
    this.fuseSettings.layout.toolbar = 'none';
    this.fuseSettings.layout.footer = 'none';

    this.fuseConfig.setSettings(this.fuseSettings);

  }

  consultants = [];
  title = 'app';
  view: string = 'month';
  // viewDate: Date = new Date();
  activeDayIsOpen: boolean = false;
  events: CalendarEvent[] = [];
  bodyevents = [];
  monthEvent = []
  openEvents: CalendarEvent[] = [];
  flag: boolean = true;

  getCloserCons(cb) {
    this.mainServ.APIServ.get("consTimes/getCloserCons?consId=" + this.consId, this.token).subscribe((data: any) => {
      if (this.mainServ.APIServ.getErrorCode() == 0) {
        if (data.CloserCons.startDate)
          this.selectedDate = new Date(data.CloserCons.startDate);
        cb()
      }
    })
  }

  getConsInMonth(event = null) {
    var startDate = new Date()
    if (event == null) {
      startDate = new Date()

    }
    else
      startDate = new Date(event)

    // startDate.setDate(1);
    // startDate.setHours(1);
    // startDate.setMinutes(1);
    this.mainServ.APIServ.get("consTimes/getConsInMonth?startDate=" + startDate.toISOString() + "&timezone=" + this.timezone() + "&consId=" + this.consId, this.token).subscribe((data: any) => {
      if (this.mainServ.APIServ.getErrorCode() == 0) {
        this.monthEvent = []
        data.getConsInMonth.forEach(element => {
          this.monthEvent.push(new Date(element["_id"].year + "/" + element["_id"].month + "/" + element["_id"].day))
        });
      }
    })
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

  timeZoneArray = [
    { "viewValue": "Tehran", "value": "Asia/Tehran" },
    { "viewValue": "Sydney", "value": "Australia/Sydney" },
    { "viewValue": "London", "value": "UTC" },
  ]


  timePlace = "Tehran"
  timezoneSelect = "Asia/Tehran"

  today = new Date();


  monthSelected(date) {
    alert(`Selected: ${date}`);
  }

  ngAfterViewInit() {
    // Find all arrow buttons in the calendar
    let buttons = document.querySelectorAll('mat-calendar mat-calendar-header button');

    if (buttons) {
      // Listen for click event
      Array.from(buttons).forEach(button => {
        this.renderer.listen(button, "click", () => {
          alert('Arrow button clicked');
        });
      })
    }
  }

  dateClass() {
    return (date: Date): String => {
      if (date.getDate() === 1) {
        return 'special-date';
      } else {
        return;
      }
    };
  }

  myFilter = (d: Date): boolean => {
    const day = d.getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  }

  toTimeZone(time, zone) {
    // console.log(time);
    var format = 'YYYY-MM-DDTHH:mm:ss.SSSZ';
    return moment(time).tz(zone)
  }
  changeDayAnas() {
    this.mainServ.loaderSer.display(true);
    let tempFrom = this.toTimeZone(this.selectedDate.getFullYear() + "-" + (this.selectedDate.getMonth() + 1) + "-" + this.selectedDate.getDate(), this.timezoneSelect)
    let tempTo = this.toTimeZone(this.selectedDate.getFullYear() + "-" + (this.selectedDate.getMonth() + 1) + "-" + this.selectedDate.getDate(), this.timezoneSelect)

    tempFrom.month(this.selectedDate.getMonth());
    tempFrom.year(this.selectedDate.getFullYear());
    tempFrom.date(this.selectedDate.getDate());
    tempFrom.hours(0);
    tempFrom.minutes(0);


    tempTo.month(this.selectedDate.getMonth());
    tempTo.year(this.selectedDate.getFullYear());
    tempTo.date(this.selectedDate.getDate());
    tempTo.hours(23);
    tempTo.minutes(59);

    // console.log("from")
    // console.log(tempFrom.format())
    // console.log("to")
    // console.log(tempTo.format())






    this.bodyevents = [];
    this.mainServ.APIServ.get("consTimes/readCalander?ids=" + this.consId + "&dateStart=" + new Date(tempFrom.format("YYYY-MM-DDTHH:mm:ss.SSSZ")).toISOString() + "&dateEnd=" + new Date(tempTo.format("YYYY-MM-DDTHH:mm:ss.SSSZ")).toISOString() + "&available=true", this.token).subscribe((data: any) => {
      if (this.mainServ.APIServ.getErrorCode() == 0) {
        var tempEvents;
        data['readCalander'][0]['slots'].forEach(element => {
          var x: CalendarEvent = {
            start: new Date(element.startDate),
            end: new Date(element.endDate),
            title: this.buildTitle(element.consId, element.clientId, element.location, element.startDate, element.endDate),
            meta: element,
          };

          x['date'] = x['start'].getFullYear() + "-" + (x['start'].getMonth() + 1) + "-" + x['start'].getDate();

          var dateStartString = x['start'].getFullYear() + "-" + x['start'].getMonth() + "-" + x['start'].getDate()
            + " " + x['start'].getHours() + ":" + x['start'].getMinutes();
          x['bodyStart'] = moment(dateStartString).tz(this.timezoneSelect).format('hh : mm');


          var dateEndString = x['end'].getFullYear() + "-" + x['end'].getMonth() + "-" + x['end'].getDate()
            + " " + x['end'].getHours() + ":" + x['end'].getMinutes();
          x['bodyEnd'] = moment(dateEndString).tz(this.timezoneSelect).format('hh : mm');

          this.setTimeZone()
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

    // this.mainServ.loaderSer.display(false);
  }

  viewDate: Date = new Date();
  form;
  consId
  jun = moment("2015-5-2 4:30");// creating obj.
  selectedDate = new Date();

  dayClicked(event) {
    if (this.isOldDate(event.date))
      return;
    // console.log(event);
    this.selectedDate = event.date;
    this.changeDayAnas();
  }
  isSelectedDay(date) {
    // console.log(date)
    if (date.toDateString() == this.selectedDate.toDateString())
      return true;
    return false
  }

  isHasConsDay(date) {
    // console.log(this.monthEvent)
    for (let index = 0; index < this.monthEvent.length; index++) {
      const element = this.monthEvent[index];
      if (date.toDateString() == element.toDateString())
        return true;
      if (index + 1 == this.monthEvent.length)
        return false;
    }
  }

  isOldDate(date) {
    if (new Date().getTime() > new Date(date).getTime())
      return true
    return false
  }
  ngOnInit() {
    // this._datePicker.selectedChange.subscribe(x => {
    //   // console.log(x);
    // });
    this.jun.tz('Asia/Tehran').format('yyyy - MM - dd hh : mm : ss a z');
    // console.log(this.jun);
    // console.log(moment.tz.names()); // for all time zone.

    var id = this.route.snapshot.paramMap.get('id');
    this.token = this.route.snapshot.paramMap.get('token');
    this.mainServ.APIServ.get("forms/getClientForm/" + id, this.token).subscribe((data: any) => {
      if (this.mainServ.APIServ.getErrorCode() == 0) {
        this.form = data['getClientForm'];
        this.consId = this.form['consId'];
        var mainThis = this
        this.getCloserCons(function () {
          mainThis.changeDayAnas();
        })
        this.getConsInMonth();
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

  timezone() {
    var timezone = moment().tz(this.timezoneSelect).utcOffset()
    return timezone / 60
  }
  appointmentIsSelected = false;

  useAppointment(appointment) {
    // alert("SSS");
    var mainThis = this;
    // this.dialogSer.confirmationMessage('Do you want to book the appointment in a date ' + appointment['date'] + " from " + appointment['bodyStart'] + " o\'clock  to " + appointment['bodyEnd'] + " at " + this.timePlace + " time." + 'in ' + appointment['meta']['location'], "forms/selectAp/" + this.form['id'], { 'apId': appointment['meta']['id'], "cityZone": this.timePlace, "timeZone": this.timezone() }, false, function () {
    this.dialogSer.confirmationMessage('Do_you_want_to_book_the_appointment', "forms/selectAp/" + this.form['id'], { 'apId': appointment['meta']['id'], "cityZone": this.timePlace, "timeZone": this.timezone() }, false, function () {
      mainThis.dialogSer.responseSelectSloteDialog(function () {
        this.appointmentIsSelected = true;
      })
    }, "put", this.token, 'bookAppointment', { "date": appointment['date'], "timeStart": appointment['bodyStart'], "timeEnd": appointment['bodyEnd'], "timePlace": this.timePlace, "location": appointment['meta']['location'] })
  }

  setTimeZone() {
    for (var index = 0; index < this.bodyevents.length; index++) {
      var element = this.bodyevents[index];

      var dateStartString = element['start'].getFullYear() + "-" + element['start'].getMonth() + "-" + element['start'].getDate()
        + " " + element['start'].getHours() + ":" + element['start'].getMinutes();
      this.bodyevents[index]['bodyStart'] = moment(dateStartString).tz(this.timezoneSelect).format('HH : mm');


      var dateEndString = element['end'].getFullYear() + "-" + element['end'].getMonth() + "-" + element['end'].getDate()
        + " " + element['end'].getHours() + ":" + element['end'].getMinutes();
      element['bodyEnd'] = moment(dateEndString).tz(this.timezoneSelect).format('HH : mm');

    };
  }

  changeTimezone(timezone) {
    var zoneObject = this.timeZoneArray.find(function (element) {
      return element.value == timezone;
    });

    this.timePlace = zoneObject.viewValue;
    this.timezoneSelect = timezone;
    this.changeDayAnas()
  }
}
