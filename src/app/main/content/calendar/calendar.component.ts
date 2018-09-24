import { FuseCalendarEventFormDialogComponent } from './event-form/event-form.component';
import { AddSlotesComponent } from './../dialogs/add-slotes/add-slotes.component';
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
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { locale as english } from '../languageFiles/en';
import { locale as persian } from '../languageFiles/fa';
import { TranslateService } from '@ngx-translate/core';
import { FuseTranslationLoaderService } from '../../../core/services/translation-loader.service';
import { CallApiService } from '../../../core/services/call-api.service';
import { MainService } from '../../../core/services/main.service';


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
  token = "F1xVylCp9enwzWpnobtN0KjeTsa7Iar5l4zebc26HMjfioaN8oGrQsWXQQdFgvxD";

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

    this.mainServ.APIServ.get("staffusers?filter[where][type]=consultant").subscribe((res: any) => {
      this.consultants = res;
    });
   this.getSlots(new Date(),[]);
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
      cell.events.forEach((event: CalendarEvent<{ consId: string, open: boolean }>) => {
        if (!event.meta.open) {
          cell.badgeTotal += 1;
          groups[event.meta.consId] = groups[event.meta.consId] || [];
          groups[event.meta.consId].push(event);
          event.color = this.getColor(event.meta.consId);

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
      if (!element.meta.open)
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
        var x = { primary: '#' + this.consultants[index].primarycolor, secondary: '#' + this.consultants[index].secondarycolor };
        return x;
      }

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
        const newEvent = response.getRawValue();
        this.events.push(newEvent);
        this.refresh.next(true);
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

  changeDate(e){
    this.selectedDay = {date:e};
    this.getSlots(this.selectedDay.date,[]);
  }

  getSlots(date,ids){
    var firstDayofMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    var lastDayofMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1);
    this.mainServ.APIServ.get("consTimes/readCalander?dateStart=" + firstDayofMonth + "&dateEnd=" + lastDayofMonth + "&ids="+ ids).subscribe((res: any) => {
      var tempEvents = res;
      tempEvents.readCalander.forEach(cons => {
        cons.slots.forEach(slot => {
          var x: CalendarEvent = {
            start: new Date(slot.startDate),
            end: new Date(slot.endDate),
            title: this.buildTitle(cons.username, slot.clientId, slot.location, slot.startDate, slot.endDate),
            meta: slot
          }
          this.events.push(x);
        });
      });
      
    });
  }
}
