import { AddApointmentComponent } from './../dialogs/add-apointment/add-apointment.component';
import { DeleteAppointmentComponent } from './../dialogs/delete-appointment/delete-appointment.component';
import { element } from 'protractor';
import { FuseCalendarEventFormDialogComponent } from './event-form/event-form.component';
import { AddSlotesComponent } from './../dialogs/add-slotes/add-slotes.component';
import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { CalendarMonthViewDay } from '../../../angular-calendar';
import { CalendarEvent } from '../../../angular-calendar';
import { colors } from './colors';
import { JsonService } from './json.service';
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
import { TimeSlots } from './TimeSlots'
import { Subject } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { locale as english } from '../languageFiles/en';
import { locale as persian } from '../languageFiles/fa';
import { TranslateService } from '@ngx-translate/core';
import { FuseTranslationLoaderService } from '../../../core/services/translation-loader.service';
import { CallApiService } from '../../../core/services/call-api.service';
import { MainService } from '../../../core/services/main.service';
import * as cloneDeep from 'lodash/cloneDeep';



@Component({
  selector: 'calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  styles: [
    `
    .cell-totals {
      margin: 5px;
      text-align: center;
    }
    .badge {
      margin-right: 5px;
    }
  `
  ]
})
export class CalendarComponent implements OnInit {
  refresh: Subject<any> = new Subject();

  dialogRef: any;
  selectedDay: any;
  constructor(
    private jsonServ: JsonService,
    public dialog: MatDialog,
    private translate: TranslateService,
    private translationLoader: FuseTranslationLoaderService,
    private callApiService: CallApiService,
    private mainServ: MainService) {
    this.translationLoader.loadTranslations(english, persian);

  }
  consultants = [];
  ngOnInit(): void {
    if (this.mainServ.loginServ.getType() == "consultant") {
      this.consultants[0] = this.mainServ.loginServ.getUserId();
    }
    this.getSlots(new Date(), this.consultants);

  }

  title = 'app';
  view: string = 'month';
  viewDate: Date = new Date();
  activeDayIsOpen: boolean;
  events = [];
  eventsForDay = []
  monthEvent: CalendarEvent[] = [];
  dayEvent: CalendarEvent[] = [];




  openEvents: CalendarEvent[] = [];
  flag: boolean = true;

  @Input()
  eventTemplate: TemplateRef<any>;

  handleEvent(action: string, event: CalendarEvent): void {
    if (event['meta'] != null) {
      if (event['meta'].open == false) {
        this.openDeleteApo(event)
      }
      else {
        this.openAddApo(event);
      }
    }
  }


  openAddApo(data) {
    this.dialogRef = this.dialog.open(AddApointmentComponent, {
      width: '400px',
      data: {
        appointment: data
      }
    });
    this.dialogRef.afterClosed()
      .subscribe(result => {
        this.changeView(this.view);
      });
  }

  openDeleteApo(data) {
    this.dialogRef = this.dialog.open(DeleteAppointmentComponent, {
      // panelClass: 'event-form-dialog',
      width: '400px',
      data: {
        appointment: data
      }
    });
    this.dialogRef.afterClosed()
      .subscribe(result => {
        this.changeView(this.view);
      });
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    this.openEvents = [];
    // console.log(events);
    console.log(date);
    this.selectedDay = { 'date': date }
    this.viewDate = date;
    events.forEach(element => {
      // if (!element.meta.open)
      this.openEvents.push(element);
    });
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  getColor(cons) {

    for (let index = 0; index < this.consultants.length; index++) {
      if (this.consultants[index].id == cons) {
        var x = { primary: this.consultants[index].primarycolor, secondary: this.consultants[index].secondarycolor };
        return x;
      }

    }
  }

  buildTitle(cons, slote) {
    var startMin = (new Date(slote.startDate).getMinutes() < 10 ? '0' : '') + new Date(slote.startDate).getMinutes();
    var endMin = (new Date(slote.endDate).getMinutes() < 10 ? '0' : '') + new Date(slote.endDate).getMinutes();

    if (slote.open == false) {
      return cons.username + ' - ' + "with " + slote.forms.nameEnglish + " " + slote.forms.surnameEnglish + ': ' + new Date(slote.startDate).getHours() + ':' + startMin + ' - ' + new Date(slote.endDate).getHours() + ':' + endMin + ' (' + slote.location + ')';

    } else {
      return cons.username + ' - ' + "free" + ': ' + new Date(slote.startDate).getHours() + ':' + startMin + ' - ' + new Date(slote.endDate).getHours() + ':' + endMin + ' (' + slote.location + ')';

    }

  }



  changeDate(e) {
    this.selectedDay = { date: e };
    this.viewDate = e
    this.getSlots(this.viewDate, []);
  }


  changeView(newView) {
    console.log(this.viewDate)
    this.view = newView
    this.getSlots(this.viewDate, this.consultants);
  }


  preperData() {
    this.dayEvent = []
    this.eventsForDay.forEach(element => {
      var slotCons = element;
      if (slotCons.length != 0) {
        for (var houre = 0; houre < 24; houre++) {
          for (var min = 0; min < 2; min++) {
            this.dayEvent.push(this.isAvailbleDate(slotCons, houre, min * 30))
          }
        }
      }
    });
    console.log(this.dayEvent);
  }


  isAvailbleDate(items, houre, min) {
    let newItem;
    items.find(item => {
      if (item.start.getHours() == houre && item.start.getMinutes() == min) {
        newItem = item;
      }
    })
    if (newItem != null) {
      return newItem
    } else {
      let start = cloneDeep(items[0].start)
      start.setHours(houre);
      start.setMinutes(min);
      let end = cloneDeep(start);
      end.setTime(start.getTime() + (30 * 60 * 1000));
      return { 'start': start, 'end': end, 'title': "Space Time", 'color': { 'primary': items[0].color.primary + "52", 'secondary': items[0].color.secondary + "52" } };
    }
  }
  getSlots(date, ids) {
    this.mainServ.loaderSer.display(true);
    this.monthEvent = []
    this.events = []
    this.eventsForDay = [];
    var index = 0
    if (this.view == "month") {
      var firstDate = new Date(date.getFullYear(), date.getMonth(), 1);
      var lastDate = new Date(date.getFullYear(), date.getMonth() + 1, 1);
    } else {
      var firstDate = new Date(date);
      var lastDate = new Date(date);
      firstDate.setHours(0);
      lastDate.setHours(23);
    }
    this.mainServ.APIServ.get("consTimes/readCalander?dateStart=" + firstDate + "&dateEnd=" + lastDate + "&ids=" + ids).subscribe((res: any) => {
      this.mainServ.loaderSer.display(false);

      if (this.mainServ.APIServ.getErrorCode() == 0) {
        var tempEvents = res;
        tempEvents.readCalander.forEach(cons => {
          index++;
          cons.slots.forEach(slot => {
            if (slot.open)
              var x: CalendarEvent = {
                start: new Date(slot.startDate),
                end: new Date(slot.endDate),
                color: { primary: cons.primarycolor, secondary: cons.secondarycolor },
                title: this.buildTitle(cons, slot),
                meta: slot
              }
            else {
              var x: CalendarEvent = {
                start: new Date(slot.startDate),
                end: new Date(slot.endDate),
                color: { primary: cons.secondarycolor, secondary: cons.primarycolor },
                title: this.buildTitle(cons, slot),
                meta: slot
              }
            }
            // if (slot.open == false) {
              this.monthEvent.push(x);
              if (this.events[index] == null) {
                this.events[index] = [];
              }
              this.events[index].push(x);
            // }
            if (this.eventsForDay[index] == null) {
              this.eventsForDay[index] = [];
            }
            this.eventsForDay[index].push(x);
            if (this.view != "month") {

              this.preperData()
            }
          });
        });
      }
    });
  }

  addEventNew() {
    this.dialogRef = this.dialog.open(AddSlotesComponent, {
      panelClass: 'event-form-dialog',
      data: {
        action: 'new',
        date: new Date()
      }
    });
    this.dialogRef.afterClosed()
      .subscribe((response: FormGroup) => {
        if (!response) {
          return;
        }
        const newEvent = response.getRawValue();
        this.events.push(newEvent);
        this.refresh.next(true);
      });
  }
  isAllowed(role) {
    return this.mainServ.globalServ.isAllowed(role);

  }
}
