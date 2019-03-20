import { LoginService } from './login.service';
import { SetTextBoxAdminComponent } from './../../main/content/dialogs/set-text-box-admin/set-text-box-admin.component';
import { ConfirmMessageComponent } from './../../main/content/dialogs/confirm-message/confirm-message.component';
import { CallApiService } from './call-api.service';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DatePipe } from '@angular/common';


@Injectable()
export class GlobalService {
  notification;
  unreadNot;

  private unreadNotBeh = new BehaviorSubject<number>(0);
  private notificationBeh = new BehaviorSubject<any>([]);

  private filteringBeh = new BehaviorSubject<any>({});

  castUnreadNotBeh = this.unreadNotBeh.asObservable();
  castNotificationBeh = this.notificationBeh.asObservable();
  castFilteringBeh = this.filteringBeh.asObservable();
  constructor(private router: Router, private route: ActivatedRoute, public APIServe: CallApiService, public logInSer: LoginService) {
    this.notification = [];
    this.unreadNot = 0;

    this.roles['manager'] = []
    this.roles['manager']["ReadCalendar"] = true
    this.roles['manager']["ReadForms"] = true
    this.roles['manager']["WriteCalendar"] = true
    this.roles['manager']["WriteForms"] = true
    this.roles['manager']["Open/BlockCalendar"] = true
    this.roles['manager']["UserDefinition"] = true
    this.roles['manager']["export"] = true


    this.roles['consultant'] = []
    this.roles['consultant']["ReadCalendar"] = true
    this.roles['consultant']["ReadForms"] = true
    this.roles['consultant']["WriteCalendar"] = true
    this.roles['consultant']["WriteForms"] = true
    this.roles['consultant']["Open/BlockCalendar"] = true
    this.roles['consultant']["UserDefinition"] = false

    this.roles['adminstrator'] = []
    this.roles['adminstrator']["ReadCalendar"] = true
    this.roles['adminstrator']["ReadForms"] = true
    this.roles['adminstrator']["WriteCalendar"] = true
    this.roles['adminstrator']["WriteForms"] = true
    this.roles['adminstrator']["Open/BlockCalendar"] = false
    this.roles['adminstrator']["UserDefinition"] = false


    this.roles['secretary'] = []
    this.roles['secretary']["ReadCalendar"] = true
    this.roles['secretary']["ReadForms"] = true
    this.roles['secretary']["WriteCalendar"] = false
    this.roles['secretary']["WriteForms"] = false
    this.roles['secretary']["Open/BlockCalendar"] = false
    this.roles['secretary']["UserDefinition"] = false


    this.roles['reception'] = [];
    this.roles['reception']["ReadCalendar"] = true
    this.roles['reception']["ReadForms"] = false
    this.roles['reception']["WriteCalendar"] = false
    this.roles['reception']["WriteForms"] = false
    this.roles['reception']["Open/BlockCalendar"] = false
    this.roles['reception']["UserDefinition"] = false

    this.pagesRole['manager'] = []
    this.pagesRole['manager']['processed'] = true
    this.pagesRole['manager']['unprocessed'] = true
    this.pagesRole['manager']['contracted'] = true
    this.pagesRole['manager']['show-form'] = true
    this.pagesRole['manager']['edit-form'] = true
    this.pagesRole['manager']['users'] = true
    this.pagesRole['manager']['addUser'] = true
    this.pagesRole['manager']['editUser'] = true
    this.pagesRole['manager']['calendar'] = true


    this.pagesRole['adminstrator'] = []
    this.pagesRole['adminstrator']['processed'] = true
    this.pagesRole['adminstrator']['unprocessed'] = true
    this.pagesRole['adminstrator']['contracted'] = true
    this.pagesRole['adminstrator']['show-form'] = true
    this.pagesRole['adminstrator']['edit-form'] = true
    this.pagesRole['adminstrator']['users'] = false
    this.pagesRole['adminstrator']['addUser'] = false
    this.pagesRole['adminstrator']['editUser'] = false
    this.pagesRole['adminstrator']['calendar'] = true


    this.pagesRole['consultant'] = []
    this.pagesRole['consultant']['processed'] = true
    this.pagesRole['consultant']['unprocessed'] = true
    this.pagesRole['consultant']['contracted'] = true
    this.pagesRole['consultant']['show-form'] = true
    this.pagesRole['consultant']['edit-form'] = true
    this.pagesRole['consultant']['users'] = false
    this.pagesRole['consultant']['addUser'] = false
    this.pagesRole['consultant']['editUser'] = false
    this.pagesRole['consultant']['calendar'] = true



    this.pagesRole['reception'] = []
    this.pagesRole['reception']['processed'] = false
    this.pagesRole['reception']['unprocessed'] = false
    this.pagesRole['reception']['contracted'] = false
    this.pagesRole['reception']['show-form'] = false
    this.pagesRole['reception']['edit-form'] = false
    this.pagesRole['reception']['users'] = false
    this.pagesRole['reception']['addUser'] = false
    this.pagesRole['reception']['editUser'] = false
    this.pagesRole['reception']['calendar'] = true



    this.pagesRole['secretary'] = []
    this.pagesRole['secretary']['processed'] = true
    this.pagesRole['secretary']['unprocessed'] = true
    this.pagesRole['secretary']['contracted'] = true
    this.pagesRole['secretary']['show-form'] = true
    this.pagesRole['secretary']['edit-form'] = false
    this.pagesRole['secretary']['users'] = false
    this.pagesRole['secretary']['addUser'] = false
    this.pagesRole['secretary']['editUser'] = false
    this.pagesRole['secretary']['calendar'] = true



  }


  goTo2(id) {
    this.router.navigateByUrl('/detail').then(() => this.router.navigateByUrl('/detail/' + id));

  }

  editUnreadNotBeh(unreadNotBeh) {
    this.unreadNotBeh.next(unreadNotBeh);
  }

  editNotificationBeh(notificationBeh) {
    this.notificationBeh.next(notificationBeh);
  }


  editFilteringBeh(filteringBeh) {
    this.filteringBeh.next(filteringBeh);
  }

  getNotification() {
    return this.notification;
  }



  setNotification(notification) {
    this.notification = notification;
  }

  setUnreadNot(unreadNot) {
    this.unreadNot = unreadNot;
  }

  getUnreadNot() {
    return this.unreadNot;
  }

  private diff_minutes(dt2, dt1) {

    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= (60);
    return Math.abs(Math.round(diff));

  }

  private diff_hours(dt2, dt1) {

    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= (60 * 60);
    return Math.abs(Math.round(diff));

  }

  private diff_days(dt2, dt1) {

    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= (60 * 60 * 24);
    return Math.abs(Math.round(diff));

  }

  private diff_week(dt2, dt1) {

    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= (60 * 60 * 24 * 7);
    return Math.abs(Math.round(diff));

  }

  private diff_month(dt2, dt1) {

    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= (60 * 60 * 24 * 30);
    return Math.abs(Math.round(diff));

  }
  calculatDateAdv(date) {
    var time = this.diff_minutes(new Date(), new Date(date))
    var pipe = new DatePipe('en-US'); // Use your own locale

    if (time < 1)
      return "الأن"
    else if (time < 60)
      return time + " دقيقة ";
    else if (this.diff_hours(new Date(), new Date(date)) < 24)
      return this.diff_hours(new Date(), new Date(date)) + " ساعة ";
    else if (this.diff_days(new Date(), new Date(date)) < 7)
      return this.diff_days(new Date(), new Date(date)) + " يوم ";
    else
      return pipe.transform(date, 'dd-MM-yyyy');


  }

  goTo(newURL) {
    this.router.navigate([newURL], { queryParams: { lang: this.logInSer.getlang() } });
  }
  reload() {
    location.reload();
  }

  errorDialog(title, containt, withRefrech: boolean = false) {
    // let dialogRef = this.dialog.open(ErrorModalComponent, {
    //   width: '50%',
    //   data: { title: title, containt: containt }
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   if (withRefrech == true) {
    //     location.reload();
    //   }
    // });
  }

  somthingError() {
    // this.APIServe.setErrorCode(0);
    // this.errorDialog('حدث خطأ', "هناك مشكلة ما")
  }



  roles = []
  pagesRole = [];
  convertNumber(fromNum) {
    console.log("fromNum");
    console.log(fromNum);
    console.log("fromNum.length");
    console.log(fromNum.length);
    var result = "";
    var number;
    var arabicMap = {
      '٩': 9,
      '٨': 8,
      '٧': 7,
      '٦': 6,
      '٥': 5,
      '٤': 4,
      '٣': 3,
      '٢': 2,
      '١': 1,
      '٠': 0
    };
    for (var index = 0; index < fromNum.length; index++) {
      var element = fromNum.charAt(index);
      console.log("element");
      console.log(element);
      if (arabicMap[element] != null)
        result += arabicMap[element];
      else
        result += element;
    };
    console.log("result");
    console.log(result);
    number = Number(result);
    console.log("number");
    console.log(number);
    return number;
  }

  isAllowed(role) {
    let typeUser = this.logInSer.getType();
    if (typeUser == null)
      return false
    return this.roles[typeUser][role];
  }

  isAllowedPage(page) {
    // return true
    let typeUser = this.logInSer.getType();
    if (typeUser == null)
      return false
    return this.pagesRole[typeUser][page];
  }

}
