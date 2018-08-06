import { Component, OnInit } from '@angular/core';
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
import { FuseCalendarEventFormDialogComponent } from './event-form/event-form.component';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { locale as english } from './i18n/en';
import { locale as farsi } from './i18n/fa';
import { TranslateService} from '@ngx-translate/core';
import { FuseTranslationLoaderService } from '../../../core/services/translation-loader.service';


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
  constructor(private jsonServ: JsonService, public dialog: MatDialog, private translate: TranslateService, private translationLoader: FuseTranslationLoaderService) {
    this.translationLoader.loadTranslations(english, farsi);

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
  ngOnInit(): void {

    var tempEvents;
    this.jsonServ.getJson().subscribe(res => {
      tempEvents = res;
      tempEvents.forEach(element => {
        var x: CalendarEvent = {
          start: new Date(element.startDate),
          end: new Date(element.endDate),
          title: this.buildTitle(element.cons, element.client, element.location, element.startDate, element.endDate),
          meta: element,
        };
        this.events.push(x);
      });

    });

  }
  title = 'app';
  view: string = 'month';
  viewDate: Date = new Date();
  activeDayIsOpen: boolean;
  events: CalendarEvent[] = [];




  // events: CalendarEvent[] = [
  //   {
  //     startDate: new Date(2018,6,27,20,0),
  //     endDate: "2018-07-27T17:34:13.239Z",
  //     location: "string",
  //     open: true,
  //     consID: "string",
  //     clientID: "string",
  //     id: "string"
  //   }
  //   {
  //     title: 'Event 1',
  //     color: colors.yellow,
  //     start: new Date(2018, 6, 23, 12),
  //     end: new Date(2018, 6, 23, 12, 30),
  //     meta: {
  //       type: 'warning'
  //     }
  //   },
  //   {
  //     title: 'Event 2',
  //     color: colors.yellow,
  //     start: new Date(),
  //     meta: {
  //       type: 'warning'
  //     }
  //   },
  //   {
  //     title: 'Event 3',
  //     color: colors.blue,
  //     start: new Date(),
  //     meta: {
  //       type: 'info'
  //     }
  //   },
  //   {
  //     title: 'Event 4',
  //     color: colors.red,
  //     start: new Date(),
  //     meta: {
  //       type: 'danger'
  //     }
  //   },
  //   {
  //     title: 'Event 5',
  //     color: colors.red,
  //     start: new Date(),
  //     meta: {
  //       type: 'danger'
  //     }
  //   }
  // ];

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

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    this.openEvents = [];
    events.forEach(element => {
      if (element.meta.open)
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

  addEvent(): void {
    this.dialogRef = this.dialog.open(FuseCalendarEventFormDialogComponent, {
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
        debugger;
        const newEvent = response.getRawValue();
        this.events.push(newEvent);
        this.refresh.next(true);
      });
  }

}
