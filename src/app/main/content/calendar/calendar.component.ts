import { viewEventComponent } from './../dialogs/view-event/view-event.component';
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

  getInfoEvent(day) {
    var tempInfo = []
    for (let index = 0; index < day.events.length; index++) {
      const element = day.events[index];
      var mainIndex = tempInfo.findIndex(p => p.consId == element.meta.consId)
      if (mainIndex == -1) {
        tempInfo.push({ "consId": element.meta.consId, "consName": element.meta.consName, "open": 0, "close": 0 })
        mainIndex = tempInfo.length - 1
        // tempInfo[element.meta.consId] = {}
        // tempInfo[element.meta.consId]["consName"] = element.meta.consName;
        // tempInfo[element.meta.consId]["open"] = 0;
        // tempInfo[element.meta.consId]["close"] = 0;
      }
      if (element.meta.open)
        tempInfo[mainIndex]["open"]++;
      else
        tempInfo[mainIndex]["close"]++;

      if (index + 1 == day.events.length) {
        return tempInfo;
        //   for (const key in tempInfo) {
        //     if (tempInfo.hasOwnProperty(key)) {
        //       const element = tempInfo[key];
        //       console.log(element);
        //       secTemp.push(element)

        //     }
        //   }
        //   return secTemp;
      }

    }

  }

  title = 'app';
  view: string = 'month';
  viewDate: Date = new Date();
  activeDayIsOpen: boolean;
  events = [];
  newEvent = [];
  eventsForDay = []
  newEventsMonth = [];
  monthEvent: CalendarEvent[] = [];
  dayEvent: CalendarEvent[] = [];




  openEvents: CalendarEvent[] = [];
  flag: boolean = true;

  @Input()
  eventTemplate: TemplateRef<any>;

  handleEvent(action: string, event: CalendarEvent): void {
    if (this.view != "month")
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
        if (result != null && result['isVisit'] == true)
          this.mainServ.globalServ.goTo('show-form/' + result["id"])
        else {
          this.getSlots(this.viewDate, this.consultants);
        }
      });
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    // this.openEvents = [];
    this.selectedDay = { 'date': date }
    this.viewDate = date;
    // events.forEach(element => {
    //   this.openEvents.push(element);
    // });
    // if (isSameMonth(date, this.viewDate)) {
    //   if (
    //     (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
    //     events.length === 0
    //   ) {
    //     this.activeDayIsOpen = false;
    //   } else {
    //     this.activeDayIsOpen = true;
    //     this.viewDate = date;
    //   }
    // }
    if (this.newEventsMonth[date.getDate()] != null || this.newEventsMonth[date.getDate()].length != 0) {
      this.dialogRef = this.dialog.open(viewEventComponent, {
        // panelClass: 'event-form-dialog',
        width: '600px',
        data: {
          events: this.newEventsMonth[date.getDate()]
        }
      });
      this.dialogRef.afterClosed()
        .subscribe(result => {
        });

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
      if (slote.forms == null) {
        console.log("slote")
        console.log(slote)
        return "";
      } else {
        console.log("true slote")
        console.log(slote)
        return cons.username + ' - ' + "with " + slote.forms.nameEnglish + " " + slote.forms.surnameEnglish + ': ' + new Date(slote.startDate).getHours() + ':' + startMin + ' - ' + new Date(slote.endDate).getHours() + ':' + endMin + ' (' + slote.location + ')';
      }
    } else {
      return cons.username + ' - ' + "free" + ': ' + new Date(slote.startDate).getHours() + ':' + startMin + ' - ' + new Date(slote.endDate).getHours() + ':' + endMin + ' (' + slote.location + ')';

    }

  }



  changeDate(e) {
    this.selectedDay = { date: e };
    this.viewDate = e
    this.getSlots(this.viewDate, this.consultants);
  }


  changeView(newView) {
    this.view = newView
    this.getSlots(this.viewDate, this.consultants);
  }


  preperData() {
    this.dayEvent = []
    var index = 0;
    this.eventsForDay.forEach(element => {
      var slotCons = element;
      if (slotCons.length != 0) {
        for (var houre = 0; houre < 24; houre++) {
          for (var min = 0; min < 2; min++) {
            this.dayEvent.push(this.isAvailbleDate(slotCons, houre, min * 30, index))
          }
        }
        index++;
      }
    });
  }


  isAvailbleDate(items, houre, min, index) {
    let newItem;
    items.find(item => {
      console.log(item)
      if (item.start.getHours() == houre && item.start.getMinutes() == min) {
        newItem = item;
      }
    })
    if (newItem != null) {
      newItem.left = index * 312;
      return newItem
    } else {
      let start = cloneDeep(items[0].start)
      start.setHours(houre);
      start.setMinutes(min);
      let end = cloneDeep(start);
      end.setTime(start.getTime() + (30 * 60 * 1000));
      return { 'start': start, 'end': end, 'left': index * 312, 'title': "Space Time", 'color': { 'primary': items[0].color.primary + "52", 'secondary': items[0].color.secondary + "52" } };
    }
  }
  getSlots(date, ids) {
    this.mainServ.loaderSer.display(true);
    this.monthEvent = []
    this.events = []
    this.eventsForDay = [];
    this.newEventsMonth = [];
    var index = 0
    if (this.view == "month") {
      var firstDate = new Date(date.getFullYear(), date.getMonth(), 1).toISOString();
      var lastDate = new Date(date.getFullYear(), date.getMonth() + 1, 1).toISOString();
    } else {
      // var firstDate = new Date(date);
      // var lastDate = new Date(date);
      // firstDate.setHours(0);
      // firstDate.setMinutes(0);

      // lastDate.setHours(23);
      // lastDate.setMinutes(59);

      var firstDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0).toISOString();
      var lastDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59).toISOString();


    }
    this.mainServ.APIServ.get("consTimes/readCalander?dateStart=" + firstDate + "&dateEnd=" + lastDate + "&ids=" + ids).subscribe((res: any) => {
      this.mainServ.loaderSer.display(false);

      if (this.mainServ.APIServ.getErrorCode() == 0) {
        var tempEvents = res;
        tempEvents.readCalander.forEach(cons => {
          index++;
          cons.slots.forEach(slot => {
            slot.consName = cons['username'].substring(0, 2);
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

            if (this.newEventsMonth[x['start'].getDate()] == null || this.isAddToMonthEvent(x)) {
              var tempX = Object.assign({}, x);
              tempX['title'] = "";
              if (slot.open == false)
                tempX['color'] = { primary: cons.primarycolor, secondary: cons.secondarycolor };
              this.monthEvent.push(tempX);
            }
            console.log("this.monthEvent")
            console.log(this.monthEvent)

            // console.log("this.newEventsMonth");
            // console.log(this.newEventsMonth);
            if (this.newEventsMonth[x['start'].getDate()] == null)
              this.newEventsMonth[x['start'].getDate()] = []
            this.newEventsMonth[x['start'].getDate()].push(x);
            if (this.events[index] == null) {
              this.events[index] = [];
            }
            this.events[index].push(x);
            // }
            if (this.eventsForDay[index] == null) {
              this.eventsForDay[index] = [];
            }
            this.eventsForDay[index].push(x);
            // alert(this.view);
            if (this.view != "month") {

              this.preperData()
            }
          });
        });
      }
    });
  }

  isAddToMonthEvent(slot) {
    // if()
    // for (var index = 0; index < this.newEventsMonth[slot['start'].getDate()].length; index++) {
    //   var element = this.newEventsMonth[slot['start'].getDate()][index];
    //   // console.log(element.meta.consId);
    //   if (element.meta.consId == slot.meta.consId) {
    //     return false;
    //   }
    // };
    return true;
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
        this.getSlots(this.viewDate, this.consultants);
        // const newEvent = response.getRawValue();
        // this.events.push(newEvent);
        // this.refresh.next(true);
      });
  }

  isAllowed(role) {
    return this.mainServ.globalServ.isAllowed(role);

  }
}
