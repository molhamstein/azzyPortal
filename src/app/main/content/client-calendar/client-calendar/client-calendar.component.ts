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
  token;
  constructor(private jsonServ: JsonService,
    public dialog: MatDialog,
    private mainServ: MainService,
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

  openEvents: CalendarEvent[] = [];
  flag: boolean = true;





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
    { "viewValue": "Abidjan", "value": "Africa/Abidjan" },
    { "viewValue": "Accra", "value": "Africa/Accra" },
    { "viewValue": "Addis_Ababa", "value": "Africa/Addis_Ababa" },
    { "viewValue": "Asmara", "value": "Africa/Asmara" },
    { "viewValue": "Asmera", "value": "Africa/Asmera" },
    { "viewValue": "Bamako", "value": "Africa/Bamako" },
    { "viewValue": "Bangui", "value": "Africa/Bangui" },
    { "viewValue": "Banjul", "value": "Africa/Banjul" },
    { "viewValue": "Bissau", "value": "Africa/Bissau" },
    { "viewValue": "Blantyre", "value": "Africa/Blantyre" },
    { "viewValue": "Brazzaville", "value": "Africa/Brazzaville" },
    { "viewValue": "Bujumbura", "value": "Africa/Bujumbura" },
    { "viewValue": "Cairo", "value": "Africa/Cairo" },
    { "viewValue": "Casablanca", "value": "Africa/Casablanca" },
    { "viewValue": "Ceuta", "value": "Africa/Ceuta" },
    { "viewValue": "Conakry", "value": "Africa/Conakry" },
    { "viewValue": "Dakar", "value": "Africa/Dakar" },
    { "viewValue": "Dar_es_Salaam", "value": "Africa/Dar_es_Salaam" },
    { "viewValue": "Djibouti", "value": "Africa/Djibouti" },
    { "viewValue": "Douala", "value": "Africa/Douala" },
    { "viewValue": "El_Aaiun", "value": "Africa/El_Aaiun" },
    { "viewValue": "Freetown", "value": "Africa/Freetown" },
    { "viewValue": "Gaborone", "value": "Africa/Gaborone" },
    { "viewValue": "Harare", "value": "Africa/Harare" },
    { "viewValue": "Johannesburg", "value": "Africa/Johannesburg" },
    { "viewValue": "Juba", "value": "Africa/Juba" },
    { "viewValue": "Kampala", "value": "Africa/Kampala" },
    { "viewValue": "Khartoum", "value": "Africa/Khartoum" },
    { "viewValue": "Kigali", "value": "Africa/Kigali" },
    { "viewValue": "Kinshasa", "value": "Africa/Kinshasa" },
    { "viewValue": "Lagos", "value": "Africa/Lagos" },
    { "viewValue": "Libreville", "value": "Africa/Libreville" },
    { "viewValue": "Lome", "value": "Africa/Lome" },
    { "viewValue": "Luanda", "value": "Africa/Luanda" },
    { "viewValue": "Lubumbashi", "value": "Africa/Lubumbashi" },
    { "viewValue": "Lusaka", "value": "Africa/Lusaka" },
    { "viewValue": "Malabo", "value": "Africa/Malabo" },
    { "viewValue": "Maputo", "value": "Africa/Maputo" },
    { "viewValue": "Maseru", "value": "Africa/Maseru" },
    { "viewValue": "Mbabane", "value": "Africa/Mbabane" },
    { "viewValue": "Mogadishu", "value": "Africa/Mogadishu" },
    { "viewValue": "Monrovia", "value": "Africa/Monrovia" },
    { "viewValue": "Nairobi", "value": "Africa/Nairobi" },
    { "viewValue": "Ndjamena", "value": "Africa/Ndjamena" },
    { "viewValue": "Niamey", "value": "Africa/Niamey" },
    { "viewValue": "Nouakchott", "value": "Africa/Nouakchott" },
    { "viewValue": "Ouagadougou", "value": "Africa/Ouagadougou" },
    { "viewValue": "Novo", "value": "Africa/Porto-Novo" },
    { "viewValue": "Sao_Tome", "value": "Africa/Sao_Tome" },
    { "viewValue": "Timbuktu", "value": "Africa/Timbuktu" },
    { "viewValue": "Tripoli", "value": "Africa/Tripoli" },
    { "viewValue": "Tunis", "value": "Africa/Tunis" },
    { "viewValue": "Windhoek", "value": "Africa/Windhoek" },
    { "viewValue": "Adak", "value": "America/Adak" },
    { "viewValue": "Anchorage", "value": "America/Anchorage" },
    { "viewValue": "Anguilla", "value": "America/Anguilla" },
    { "viewValue": "Antigua", "value": "America/Antigua" },
    { "viewValue": "Araguaina", "value": "America/Araguaina" },
    { "viewValue": "Buenos_Aires", "value": "America/Argentina/Buenos_Aires" },
    { "viewValue": "Catamarca", "value": "America/Argentina/Catamarca" },
    { "viewValue": "ComodRivadavia", "value": "America/Argentina/ComodRivadavia" },
    { "viewValue": "Cordoba", "value": "America/Argentina/Cordoba" },
    { "viewValue": "Jujuy", "value": "America/Argentina/Jujuy" },
    { "viewValue": "La_Rioja", "value": "America/Argentina/La_Rioja" },
    { "viewValue": "Mendoza", "value": "America/Argentina/Mendoza" },
    { "viewValue": "Rio_Gallegos", "value": "America/Argentina/Rio_Gallegos" },
    { "viewValue": "Salta", "value": "America/Argentina/Salta" },
    { "viewValue": "San_Juan", "value": "America/Argentina/San_Juan" },
    { "viewValue": "San_Luis", "value": "America/Argentina/San_Luis" },
    { "viewValue": "Tucuman", "value": "America/Argentina/Tucuman" },
    { "viewValue": "Ushuaia", "value": "America/Argentina/Ushuaia" },
    { "viewValue": "Aruba", "value": "America/Aruba" },
    { "viewValue": "Asuncion", "value": "America/Asuncion" },
    { "viewValue": "Atikokan", "value": "America/Atikokan" },
    { "viewValue": "Atka", "value": "America/Atka" },
    { "viewValue": "Bahia", "value": "America/Bahia" },
    { "viewValue": "Bahia_Banderas", "value": "America/Bahia_Banderas" },
    { "viewValue": "Barbados", "value": "America/Barbados" },
    { "viewValue": "Belem", "value": "America/Belem" },
    { "viewValue": "Belize", "value": "America/Belize" },
    { "viewValue": "Sablon", "value": "America/Blanc-Sablon" },
    { "viewValue": "Boa_Vista", "value": "America/Boa_Vista" },
    { "viewValue": "Bogota", "value": "America/Bogota" },
    { "viewValue": "Boise", "value": "America/Boise" },
    { "viewValue": "Buenos_Aires", "value": "America/Buenos_Aires" },
    { "viewValue": "Cambridge_Bay", "value": "America/Cambridge_Bay" },
    { "viewValue": "Campo_Grande", "value": "America/Campo_Grande" },
    { "viewValue": "Cancun", "value": "America/Cancun" },
    { "viewValue": "Caracas", "value": "America/Caracas" },
    { "viewValue": "Catamarca", "value": "America/Catamarca" },
    { "viewValue": "Cayenne", "value": "America/Cayenne" },
    { "viewValue": "Cayman", "value": "America/Cayman" },
    { "viewValue": "Chicago", "value": "America/Chicago" },
    { "viewValue": "Chihuahua", "value": "America/Chihuahua" },
    { "viewValue": "Coral_Harbour", "value": "America/Coral_Harbour" },
    { "viewValue": "Cordoba", "value": "America/Cordoba" },
    { "viewValue": "Costa_Rica", "value": "America/Costa_Rica" },
    { "viewValue": "Creston", "value": "America/Creston" },
    { "viewValue": "Cuiaba", "value": "America/Cuiaba" },
    { "viewValue": "Curacao", "value": "America/Curacao" },
    { "viewValue": "Danmarkshavn", "value": "America/Danmarkshavn" },
    { "viewValue": "Dawson", "value": "America/Dawson" },
    { "viewValue": "Dawson_Creek", "value": "America/Dawson_Creek" },
    { "viewValue": "Denver", "value": "America/Denver" },
    { "viewValue": "Detroit", "value": "America/Detroit" },
    { "viewValue": "Dominica", "value": "America/Dominica" },
    { "viewValue": "Edmonton", "value": "America/Edmonton" },
    { "viewValue": "Eirunepe", "value": "America/Eirunepe" },
    { "viewValue": "El_Salvador", "value": "America/El_Salvador" },
    { "viewValue": "Ensenada", "value": "America/Ensenada" },
    { "viewValue": "Fort_Nelson", "value": "America/Fort_Nelson" },
    { "viewValue": "Fort_Wayne", "value": "America/Fort_Wayne" },
    { "viewValue": "Fortaleza", "value": "America/Fortaleza" },
    { "viewValue": "Glace_Bay", "value": "America/Glace_Bay" },
    { "viewValue": "Godthab", "value": "America/Godthab" },
    { "viewValue": "Goose_Bay", "value": "America/Goose_Bay" },
    { "viewValue": "Grand_Turk", "value": "America/Grand_Turk" },
    { "viewValue": "Grenada", "value": "America/Grenada" },
    { "viewValue": "Guadeloupe", "value": "America/Guadeloupe" },
    { "viewValue": "Guatemala", "value": "America/Guatemala" },
    { "viewValue": "Guayaquil", "value": "America/Guayaquil" },
    { "viewValue": "Guyana", "value": "America/Guyana" },
    { "viewValue": "Halifax", "value": "America/Halifax" },
    { "viewValue": "Havana", "value": "America/Havana" },
    { "viewValue": "Hermosillo", "value": "America/Hermosillo" },
    { "viewValue": "Indianapolis", "value": "America/Indiana/Indianapolis" },
    { "viewValue": "Knox", "value": "America/Indiana/Knox" },
    { "viewValue": "Marengo", "value": "America/Indiana/Marengo" },
    { "viewValue": "Petersburg", "value": "America/Indiana/Petersburg" },
    { "viewValue": "Tell_City", "value": "America/Indiana/Tell_City" },
    { "viewValue": "Vevay", "value": "America/Indiana/Vevay" },
    { "viewValue": "Vincennes", "value": "America/Indiana/Vincennes" },
    { "viewValue": "Winamac", "value": "America/Indiana/Winamac" },
    { "viewValue": "Indianapolis", "value": "America/Indianapolis" },
    { "viewValue": "Inuvik", "value": "America/Inuvik" },
    { "viewValue": "Iqaluit", "value": "America/Iqaluit" },
    { "viewValue": "Jamaica", "value": "America/Jamaica" },
    { "viewValue": "Jujuy", "value": "America/Jujuy" },
    { "viewValue": "Juneau", "value": "America/Juneau" },
    { "viewValue": "Louisville", "value": "America/Kentucky/Louisville" },
    { "viewValue": "Monticello", "value": "America/Kentucky/Monticello" },
    { "viewValue": "Knox_IN", "value": "America/Knox_IN" },
    { "viewValue": "Kralendijk", "value": "America/Kralendijk" },
    { "viewValue": "La_Paz", "value": "America/La_Paz" },
    { "viewValue": "Lima", "value": "America/Lima" },
    { "viewValue": "Los_Angeles", "value": "America/Los_Angeles" },
    { "viewValue": "Louisville", "value": "America/Louisville" },
    { "viewValue": "Lower_Princes", "value": "America/Lower_Princes" },
    { "viewValue": "Maceio", "value": "America/Maceio" },
    { "viewValue": "Managua", "value": "America/Managua" },
    { "viewValue": "Manaus", "value": "America/Manaus" },
    { "viewValue": "Marigot", "value": "America/Marigot" },
    { "viewValue": "Martinique", "value": "America/Martinique" },
    { "viewValue": "Matamoros", "value": "America/Matamoros" },
    { "viewValue": "Mazatlan", "value": "America/Mazatlan" },
    { "viewValue": "Mendoza", "value": "America/Mendoza" },
    { "viewValue": "Menominee", "value": "America/Menominee" },
    { "viewValue": "Merida", "value": "America/Merida" },
    { "viewValue": "Metlakatla", "value": "America/Metlakatla" },
    { "viewValue": "Mexico_City", "value": "America/Mexico_City" },
    { "viewValue": "Miquelon", "value": "America/Miquelon" },
    { "viewValue": "Moncton", "value": "America/Moncton" },
    { "viewValue": "Monterrey", "value": "America/Monterrey" },
    { "viewValue": "Montevideo", "value": "America/Montevideo" },
    { "viewValue": "Montreal", "value": "America/Montreal" },
    { "viewValue": "Montserrat", "value": "America/Montserrat" },
    { "viewValue": "Nassau", "value": "America/Nassau" },
    { "viewValue": "New_York", "value": "America/New_York" },
    { "viewValue": "Nipigon", "value": "America/Nipigon" },
    { "viewValue": "Nome", "value": "America/Nome" },
    { "viewValue": "Noronha", "value": "America/Noronha" },
    { "viewValue": "Beulah", "value": "America/North_Dakota/Beulah" },
    { "viewValue": "Center", "value": "America/North_Dakota/Center" },
    { "viewValue": "New_Salem", "value": "America/North_Dakota/New_Salem" },
    { "viewValue": "Ojinaga", "value": "America/Ojinaga" },
    { "viewValue": "Panama", "value": "America/Panama" },
    { "viewValue": "Pangnirtung", "value": "America/Pangnirtung" },
    { "viewValue": "Paramaribo", "value": "America/Paramaribo" },
    { "viewValue": "Phoenix", "value": "America/Phoenix" },
    { "viewValue": "Prince", "value": "America/Port-au-Prince" },
    { "viewValue": "Port_of_Spain", "value": "America/Port_of_Spain" },
    { "viewValue": "Porto_Acre", "value": "America/Porto_Acre" },
    { "viewValue": "Porto_Velho", "value": "America/Porto_Velho" },
    { "viewValue": "Puerto_Rico", "value": "America/Puerto_Rico" },
    { "viewValue": "Punta_Arenas", "value": "America/Punta_Arenas" },
    { "viewValue": "Rainy_River", "value": "America/Rainy_River" },
    { "viewValue": "Rankin_Inlet", "value": "America/Rankin_Inlet" },
    { "viewValue": "Recife", "value": "America/Recife" },
    { "viewValue": "Regina", "value": "America/Regina" },
    { "viewValue": "Resolute", "value": "America/Resolute" },
    { "viewValue": "Rio_Branco", "value": "America/Rio_Branco" },
    { "viewValue": "Rosario", "value": "America/Rosario" },
    { "viewValue": "Santa_Isabel", "value": "America/Santa_Isabel" },
    { "viewValue": "Santarem", "value": "America/Santarem" },
    { "viewValue": "Santiago", "value": "America/Santiago" },
    { "viewValue": "Santo_Domingo", "value": "America/Santo_Domingo" },
    { "viewValue": "Sao_Paulo", "value": "America/Sao_Paulo" },
    { "viewValue": "Scoresbysund", "value": "America/Scoresbysund" },
    { "viewValue": "Shiprock", "value": "America/Shiprock" },
    { "viewValue": "Sitka", "value": "America/Sitka" },
    { "viewValue": "St_Barthelemy", "value": "America/St_Barthelemy" },
    { "viewValue": "St_Johns", "value": "America/St_Johns" },
    { "viewValue": "St_Kitts", "value": "America/St_Kitts" },
    { "viewValue": "St_Lucia", "value": "America/St_Lucia" },
    { "viewValue": "St_Thomas", "value": "America/St_Thomas" },
    { "viewValue": "St_Vincent", "value": "America/St_Vincent" },
    { "viewValue": "Swift_Current", "value": "America/Swift_Current" },
    { "viewValue": "Tegucigalpa", "value": "America/Tegucigalpa" },
    { "viewValue": "Thule", "value": "America/Thule" },
    { "viewValue": "Thunder_Bay", "value": "America/Thunder_Bay" },
    { "viewValue": "Tijuana", "value": "America/Tijuana" },
    { "viewValue": "Toronto", "value": "America/Toronto" },
    { "viewValue": "Tortola", "value": "America/Tortola" },
    { "viewValue": "Vancouver", "value": "America/Vancouver" },
    { "viewValue": "Virgin", "value": "America/Virgin" },
    { "viewValue": "Whitehorse", "value": "America/Whitehorse" },
    { "viewValue": "Winnipeg", "value": "America/Winnipeg" },
    { "viewValue": "Yakutat", "value": "America/Yakutat" },
    { "viewValue": "Yellowknife", "value": "America/Yellowknife" },
    { "viewValue": "Casey", "value": "Antarctica/Casey" },
    { "viewValue": "Davis", "value": "Antarctica/Davis" },
    { "viewValue": "DumontDUrville", "value": "Antarctica/DumontDUrville" },
    { "viewValue": "Macquarie", "value": "Antarctica/Macquarie" },
    { "viewValue": "Mawson", "value": "Antarctica/Mawson" },
    { "viewValue": "McMurdo", "value": "Antarctica/McMurdo" },
    { "viewValue": "Palmer", "value": "Antarctica/Palmer" },
    { "viewValue": "Rothera", "value": "Antarctica/Rothera" },
    { "viewValue": "South_Pole", "value": "Antarctica/South_Pole" },
    { "viewValue": "Syowa", "value": "Antarctica/Syowa" },
    { "viewValue": "Troll", "value": "Antarctica/Troll" },
    { "viewValue": "Vostok", "value": "Antarctica/Vostok" },
    { "viewValue": "Longyearbyen", "value": "Arctic/Longyearbyen" },
    { "viewValue": "Aden", "value": "Asia/Aden" },
    { "viewValue": "Almaty", "value": "Asia/Almaty" },
    { "viewValue": "Amman", "value": "Asia/Amman" },
    { "viewValue": "Anadyr", "value": "Asia/Anadyr" },
    { "viewValue": "Aqtau", "value": "Asia/Aqtau" },
    { "viewValue": "Aqtobe", "value": "Asia/Aqtobe" },
    { "viewValue": "Ashgabat", "value": "Asia/Ashgabat" },
    { "viewValue": "Ashkhabad", "value": "Asia/Ashkhabad" },
    { "viewValue": "Atyrau", "value": "Asia/Atyrau" },
    { "viewValue": "Baghdad", "value": "Asia/Baghdad" },
    { "viewValue": "Bahrain", "value": "Asia/Bahrain" },
    { "viewValue": "Baku", "value": "Asia/Baku" },
    { "viewValue": "Bangkok", "value": "Asia/Bangkok" },
    { "viewValue": "Barnaul", "value": "Asia/Barnaul" },
    { "viewValue": "Beirut", "value": "Asia/Beirut" },
    { "viewValue": "Bishkek", "value": "Asia/Bishkek" },
    { "viewValue": "Brunei", "value": "Asia/Brunei" },
    { "viewValue": "Calcutta", "value": "Asia/Calcutta" },
    { "viewValue": "Chita", "value": "Asia/Chita" },
    { "viewValue": "Choibalsan", "value": "Asia/Choibalsan" },
    { "viewValue": "Chongqing", "value": "Asia/Chongqing" },
    { "viewValue": "Chungking", "value": "Asia/Chungking" },
    { "viewValue": "Colombo", "value": "Asia/Colombo" },
    { "viewValue": "Dacca", "value": "Asia/Dacca" },
    { "viewValue": "Damascus", "value": "Asia/Damascus" },
    { "viewValue": "Dhaka", "value": "Asia/Dhaka" },
    { "viewValue": "Dili", "value": "Asia/Dili" },
    { "viewValue": "Dubai", "value": "Asia/Dubai" },
    { "viewValue": "Dushanbe", "value": "Asia/Dushanbe" },
    { "viewValue": "Famagusta", "value": "Asia/Famagusta" },
    { "viewValue": "Gaza", "value": "Asia/Gaza" },
    { "viewValue": "Harbin", "value": "Asia/Harbin" },
    { "viewValue": "Hebron", "value": "Asia/Hebron" },
    { "viewValue": "Ho_Chi_Minh", "value": "Asia/Ho_Chi_Minh" },
    { "viewValue": "Hong_Kong", "value": "Asia/Hong_Kong" },
    { "viewValue": "Hovd", "value": "Asia/Hovd" },
    { "viewValue": "Irkutsk", "value": "Asia/Irkutsk" },
    { "viewValue": "Istanbul", "value": "Asia/Istanbul" },
    { "viewValue": "Jakarta", "value": "Asia/Jakarta" },
    { "viewValue": "Jayapura", "value": "Asia/Jayapura" },
    { "viewValue": "Jerusalem", "value": "Asia/Jerusalem" },
    { "viewValue": "Kabul", "value": "Asia/Kabul" },
    { "viewValue": "Kamchatka", "value": "Asia/Kamchatka" },
    { "viewValue": "Karachi", "value": "Asia/Karachi" },
    { "viewValue": "Kashgar", "value": "Asia/Kashgar" },
    { "viewValue": "Kathmandu", "value": "Asia/Kathmandu" },
    { "viewValue": "Katmandu", "value": "Asia/Katmandu" },
    { "viewValue": "Khandyga", "value": "Asia/Khandyga" },
    { "viewValue": "Kolkata", "value": "Asia/Kolkata" },
    { "viewValue": "Krasnoyarsk", "value": "Asia/Krasnoyarsk" },
    { "viewValue": "Kuala_Lumpur", "value": "Asia/Kuala_Lumpur" },
    { "viewValue": "Kuching", "value": "Asia/Kuching" },
    { "viewValue": "Kuwait", "value": "Asia/Kuwait" },
    { "viewValue": "Macao", "value": "Asia/Macao" },
    { "viewValue": "Macau", "value": "Asia/Macau" },
    { "viewValue": "Magadan", "value": "Asia/Magadan" },
    { "viewValue": "Makassar", "value": "Asia/Makassar" },
    { "viewValue": "Manila", "value": "Asia/Manila" },
    { "viewValue": "Muscat", "value": "Asia/Muscat" },
    { "viewValue": "Nicosia", "value": "Asia/Nicosia" },
    { "viewValue": "Novokuznetsk", "value": "Asia/Novokuznetsk" },
    { "viewValue": "Novosibirsk", "value": "Asia/Novosibirsk" },
    { "viewValue": "Omsk", "value": "Asia/Omsk" },
    { "viewValue": "Oral", "value": "Asia/Oral" },
    { "viewValue": "Phnom_Penh", "value": "Asia/Phnom_Penh" },
    { "viewValue": "Pontianak", "value": "Asia/Pontianak" },
    { "viewValue": "Pyongyang", "value": "Asia/Pyongyang" },
    { "viewValue": "Qatar", "value": "Asia/Qatar" },
    { "viewValue": "Qyzylorda", "value": "Asia/Qyzylorda" },
    { "viewValue": "Rangoon", "value": "Asia/Rangoon" },
    { "viewValue": "Riyadh", "value": "Asia/Riyadh" },
    { "viewValue": "Saigon", "value": "Asia/Saigon" },
    { "viewValue": "Sakhalin", "value": "Asia/Sakhalin" },
    { "viewValue": "Samarkand", "value": "Asia/Samarkand" },
    { "viewValue": "Seoul", "value": "Asia/Seoul" },
    { "viewValue": "Shanghai", "value": "Asia/Shanghai" },
    { "viewValue": "Singapore", "value": "Asia/Singapore" },
    { "viewValue": "Srednekolymsk", "value": "Asia/Srednekolymsk" },
    { "viewValue": "Taipei", "value": "Asia/Taipei" },
    { "viewValue": "Tashkent", "value": "Asia/Tashkent" },
    { "viewValue": "Tbilisi", "value": "Asia/Tbilisi" },
    { "viewValue": "Tehran", "value": "Asia/Tehran" },
    { "viewValue": "Tel_Aviv", "value": "Asia/Tel_Aviv" },
    { "viewValue": "Thimbu", "value": "Asia/Thimbu" },
    { "viewValue": "Thimphu", "value": "Asia/Thimphu" },
    { "viewValue": "Tokyo", "value": "Asia/Tokyo" },
    { "viewValue": "Tomsk", "value": "Asia/Tomsk" },
    { "viewValue": "Ujung_Pandang", "value": "Asia/Ujung_Pandang" },
    { "viewValue": "Ulaanbaatar", "value": "Asia/Ulaanbaatar" },
    { "viewValue": "Ulan_Bator", "value": "Asia/Ulan_Bator" },
    { "viewValue": "Urumqi", "value": "Asia/Urumqi" },
    { "viewValue": "Nera", "value": "Asia/Ust-Nera" },
    { "viewValue": "Vientiane", "value": "Asia/Vientiane" },
    { "viewValue": "Vladivostok", "value": "Asia/Vladivostok" },
    { "viewValue": "Yakutsk", "value": "Asia/Yakutsk" },
    { "viewValue": "Yangon", "value": "Asia/Yangon" },
    { "viewValue": "Yekaterinburg", "value": "Asia/Yekaterinburg" },
    { "viewValue": "Yerevan", "value": "Asia/Yerevan" },
    { "viewValue": "Azores", "value": "Atlantic/Azores" },
    { "viewValue": "Bermuda", "value": "Atlantic/Bermuda" },
    { "viewValue": "Canary", "value": "Atlantic/Canary" },
    { "viewValue": "Cape_Verde", "value": "Atlantic/Cape_Verde" },
    { "viewValue": "Faeroe", "value": "Atlantic/Faeroe" },
    { "viewValue": "Faroe", "value": "Atlantic/Faroe" },
    { "viewValue": "Jan_Mayen", "value": "Atlantic/Jan_Mayen" },
    { "viewValue": "Madeira", "value": "Atlantic/Madeira" },
    { "viewValue": "Reykjavik", "value": "Atlantic/Reykjavik" },
    { "viewValue": "South_Georgia", "value": "Atlantic/South_Georgia" },
    { "viewValue": "St_Helena", "value": "Atlantic/St_Helena" },
    { "viewValue": "Stanley", "value": "Atlantic/Stanley" },
    { "viewValue": "ACT", "value": "Australia/ACT" },
    { "viewValue": "Adelaide", "value": "Australia/Adelaide" },
    { "viewValue": "Brisbane", "value": "Australia/Brisbane" },
    { "viewValue": "Broken_Hill", "value": "Australia/Broken_Hill" },
    { "viewValue": "Canberra", "value": "Australia/Canberra" },
    { "viewValue": "Currie", "value": "Australia/Currie" },
    { "viewValue": "Darwin", "value": "Australia/Darwin" },
    { "viewValue": "Eucla", "value": "Australia/Eucla" },
    { "viewValue": "Hobart", "value": "Australia/Hobart" },
    { "viewValue": "LHI", "value": "Australia/LHI" },
    { "viewValue": "Lindeman", "value": "Australia/Lindeman" },
    { "viewValue": "Lord_Howe", "value": "Australia/Lord_Howe" },
    { "viewValue": "Melbourne", "value": "Australia/Melbourne" },
    { "viewValue": "NSW", "value": "Australia/NSW" },
    { "viewValue": "North", "value": "Australia/North" },
    { "viewValue": "Perth", "value": "Australia/Perth" },
    { "viewValue": "Queensland", "value": "Australia/Queensland" },
    { "viewValue": "South", "value": "Australia/South" },
    { "viewValue": "Sydney", "value": "Australia/Sydney" },
    { "viewValue": "Tasmania", "value": "Australia/Tasmania" },
    { "viewValue": "Victoria", "value": "Australia/Victoria" },
    { "viewValue": "West", "value": "Australia/West" },
    { "viewValue": "Yancowinna", "value": "Australia/Yancowinna" },
    { "viewValue": "Acre", "value": "Brazil/Acre" },
    { "viewValue": "DeNoronha", "value": "Brazil/DeNoronha" },
    { "viewValue": "East", "value": "Brazil/East" },
    { "viewValue": "West", "value": "Brazil/West" },
    { "viewValue": "CET", "value": "CET" },
    { "viewValue": "CST6CDT", "value": "CST6CDT" },
    { "viewValue": "Atlantic", "value": "Canada/Atlantic" },
    { "viewValue": "Central", "value": "Canada/Central" },
    { "viewValue": "Eastern", "value": "Canada/Eastern" },
    { "viewValue": "Mountain", "value": "Canada/Mountain" },
    { "viewValue": "Newfoundland", "value": "Canada/Newfoundland" },
    { "viewValue": "Pacific", "value": "Canada/Pacific" },
    { "viewValue": "Saskatchewan", "value": "Canada/Saskatchewan" },
    { "viewValue": "Yukon", "value": "Canada/Yukon" },
    { "viewValue": "Continental", "value": "Chile/Continental" },
    { "viewValue": "EasterIsland", "value": "Chile/EasterIsland" },
    { "viewValue": "Cuba", "value": "Cuba" },
    { "viewValue": "EET", "value": "EET" },
    { "viewValue": "EST", "value": "EST" },
    { "viewValue": "EST5EDT", "value": "EST5EDT" },
    { "viewValue": "Egypt", "value": "Egypt" },
    { "viewValue": "Eire", "value": "Eire" },
    { "viewValue": "Amsterdam", "value": "Europe/Amsterdam" },
    { "viewValue": "Andorra", "value": "Europe/Andorra" },
    { "viewValue": "Astrakhan", "value": "Europe/Astrakhan" },
    { "viewValue": "Athens", "value": "Europe/Athens" },
    { "viewValue": "Belfast", "value": "Europe/Belfast" },
    { "viewValue": "Belgrade", "value": "Europe/Belgrade" },
    { "viewValue": "Berlin", "value": "Europe/Berlin" },
    { "viewValue": "Bratislava", "value": "Europe/Bratislava" },
    { "viewValue": "Brussels", "value": "Europe/Brussels" },
    { "viewValue": "Bucharest", "value": "Europe/Bucharest" },
    { "viewValue": "Budapest", "value": "Europe/Budapest" },
    { "viewValue": "Busingen", "value": "Europe/Busingen" },
    { "viewValue": "Chisinau", "value": "Europe/Chisinau" },
    { "viewValue": "Copenhagen", "value": "Europe/Copenhagen" },
    { "viewValue": "Dublin", "value": "Europe/Dublin" },
    { "viewValue": "Gibraltar", "value": "Europe/Gibraltar" },
    { "viewValue": "Guernsey", "value": "Europe/Guernsey" },
    { "viewValue": "Helsinki", "value": "Europe/Helsinki" },
    { "viewValue": "Isle_of_Man", "value": "Europe/Isle_of_Man" },
    { "viewValue": "Istanbul", "value": "Europe/Istanbul" },
    { "viewValue": "Jersey", "value": "Europe/Jersey" },
    { "viewValue": "Kaliningrad", "value": "Europe/Kaliningrad" },
    { "viewValue": "Kiev", "value": "Europe/Kiev" },
    { "viewValue": "Kirov", "value": "Europe/Kirov" },
    { "viewValue": "Lisbon", "value": "Europe/Lisbon" },
    { "viewValue": "Ljubljana", "value": "Europe/Ljubljana" },
    { "viewValue": "London", "value": "Europe/London" },
    { "viewValue": "Luxembourg", "value": "Europe/Luxembourg" },
    { "viewValue": "Madrid", "value": "Europe/Madrid" },
    { "viewValue": "Malta", "value": "Europe/Malta" },
    { "viewValue": "Mariehamn", "value": "Europe/Mariehamn" },
    { "viewValue": "Minsk", "value": "Europe/Minsk" },
    { "viewValue": "Monaco", "value": "Europe/Monaco" },
    { "viewValue": "Moscow", "value": "Europe/Moscow" },
    { "viewValue": "Nicosia", "value": "Europe/Nicosia" },
    { "viewValue": "Oslo", "value": "Europe/Oslo" },
    { "viewValue": "Paris", "value": "Europe/Paris" },
    { "viewValue": "Podgorica", "value": "Europe/Podgorica" },
    { "viewValue": "Prague", "value": "Europe/Prague" },
    { "viewValue": "Riga", "value": "Europe/Riga" },
    { "viewValue": "Rome", "value": "Europe/Rome" },
    { "viewValue": "Samara", "value": "Europe/Samara" },
    { "viewValue": "San_Marino", "value": "Europe/San_Marino" },
    { "viewValue": "Sarajevo", "value": "Europe/Sarajevo" },
    { "viewValue": "Saratov", "value": "Europe/Saratov" },
    { "viewValue": "Simferopol", "value": "Europe/Simferopol" },
    { "viewValue": "Skopje", "value": "Europe/Skopje" },
    { "viewValue": "Sofia", "value": "Europe/Sofia" },
    { "viewValue": "Stockholm", "value": "Europe/Stockholm" },
    { "viewValue": "Tallinn", "value": "Europe/Tallinn" },
    { "viewValue": "Tirane", "value": "Europe/Tirane" },
    { "viewValue": "Tiraspol", "value": "Europe/Tiraspol" },
    { "viewValue": "Ulyanovsk", "value": "Europe/Ulyanovsk" },
    { "viewValue": "Uzhgorod", "value": "Europe/Uzhgorod" },
    { "viewValue": "Vaduz", "value": "Europe/Vaduz" },
    { "viewValue": "Vatican", "value": "Europe/Vatican" },
    { "viewValue": "Vienna", "value": "Europe/Vienna" },
    { "viewValue": "Vilnius", "value": "Europe/Vilnius" },
    { "viewValue": "Volgograd", "value": "Europe/Volgograd" },
    { "viewValue": "Warsaw", "value": "Europe/Warsaw" },
    { "viewValue": "Zagreb", "value": "Europe/Zagreb" },
    { "viewValue": "Zaporozhye", "value": "Europe/Zaporozhye" },
    { "viewValue": "Zurich", "value": "Europe/Zurich" },
    { "viewValue": "Iceland", "value": "Iceland" },
    { "viewValue": "Antananarivo", "value": "Indian/Antananarivo" },
    { "viewValue": "Chagos", "value": "Indian/Chagos" },
    { "viewValue": "Christmas", "value": "Indian/Christmas" },
    { "viewValue": "Cocos", "value": "Indian/Cocos" },
    { "viewValue": "Comoro", "value": "Indian/Comoro" },
    { "viewValue": "Kerguelen", "value": "Indian/Kerguelen" },
    { "viewValue": "Mahe", "value": "Indian/Mahe" },
    { "viewValue": "Maldives", "value": "Indian/Maldives" },
    { "viewValue": "Mauritius", "value": "Indian/Mauritius" },
    { "viewValue": "Mayotte", "value": "Indian/Mayotte" },
    { "viewValue": "Reunion", "value": "Indian/Reunion" },
    { "viewValue": "Iran", "value": "Iran" },
    { "viewValue": "Jamaica", "value": "Jamaica" },
    { "viewValue": "Japan", "value": "Japan" },
    { "viewValue": "Kwajalein", "value": "Kwajalein" },
    { "viewValue": "Libya", "value": "Libya" },
    { "viewValue": "MET", "value": "MET" },
    { "viewValue": "MST", "value": "MST" },
    { "viewValue": "MST7MDT", "value": "MST7MDT" },
    { "viewValue": "BajaNorte", "value": "Mexico/BajaNorte" },
    { "viewValue": "BajaSur", "value": "Mexico/BajaSur" },
    { "viewValue": "General", "value": "Mexico/General" },
    { "viewValue": "NZ", "value": "NZ" },
    { "viewValue": "CHAT", "value": "NZ-CHAT" },
    { "viewValue": "Navajo", "value": "Navajo" },
    { "viewValue": "PRC", "value": "PRC" },
    { "viewValue": "PST8PDT", "value": "PST8PDT" },
    { "viewValue": "Apia", "value": "Pacific/Apia" },
    { "viewValue": "Auckland", "value": "Pacific/Auckland" },
    { "viewValue": "Bougainville", "value": "Pacific/Bougainville" },
    { "viewValue": "Chatham", "value": "Pacific/Chatham" },
    { "viewValue": "Chuuk", "value": "Pacific/Chuuk" },
    { "viewValue": "Easter", "value": "Pacific/Easter" },
    { "viewValue": "Efate", "value": "Pacific/Efate" },
    { "viewValue": "Enderbury", "value": "Pacific/Enderbury" },
    { "viewValue": "Fakaofo", "value": "Pacific/Fakaofo" },
    { "viewValue": "Fiji", "value": "Pacific/Fiji" },
    { "viewValue": "Funafuti", "value": "Pacific/Funafuti" },
    { "viewValue": "Galapagos", "value": "Pacific/Galapagos" },
    { "viewValue": "Gambier", "value": "Pacific/Gambier" },
    { "viewValue": "Guadalcanal", "value": "Pacific/Guadalcanal" },
    { "viewValue": "Guam", "value": "Pacific/Guam" },
    { "viewValue": "Honolulu", "value": "Pacific/Honolulu" },
    { "viewValue": "Johnston", "value": "Pacific/Johnston" },
    { "viewValue": "Kiritimati", "value": "Pacific/Kiritimati" },
    { "viewValue": "Kosrae", "value": "Pacific/Kosrae" },
    { "viewValue": "Kwajalein", "value": "Pacific/Kwajalein" },
    { "viewValue": "Majuro", "value": "Pacific/Majuro" },
    { "viewValue": "Marquesas", "value": "Pacific/Marquesas" },
    { "viewValue": "Midway", "value": "Pacific/Midway" },
    { "viewValue": "Nauru", "value": "Pacific/Nauru" },
    { "viewValue": "Niue", "value": "Pacific/Niue" },
    { "viewValue": "Norfolk", "value": "Pacific/Norfolk" },
    { "viewValue": "Noumea", "value": "Pacific/Noumea" },
    { "viewValue": "Pago_Pago", "value": "Pacific/Pago_Pago" },
    { "viewValue": "Palau", "value": "Pacific/Palau" },
    { "viewValue": "Pitcairn", "value": "Pacific/Pitcairn" },
    { "viewValue": "Pohnpei", "value": "Pacific/Pohnpei" },
    { "viewValue": "Ponape", "value": "Pacific/Ponape" },
    { "viewValue": "Port_Moresby", "value": "Pacific/Port_Moresby" },
    { "viewValue": "Rarotonga", "value": "Pacific/Rarotonga" },
    { "viewValue": "Saipan", "value": "Pacific/Saipan" },
    { "viewValue": "Samoa", "value": "Pacific/Samoa" },
    { "viewValue": "Tahiti", "value": "Pacific/Tahiti" },
    { "viewValue": "Tarawa", "value": "Pacific/Tarawa" },
    { "viewValue": "Tongatapu", "value": "Pacific/Tongatapu" },
    { "viewValue": "Truk", "value": "Pacific/Truk" },
    { "viewValue": "Wake", "value": "Pacific/Wake" },
    { "viewValue": "Wallis", "value": "Pacific/Wallis" },
    { "viewValue": "Yap", "value": "Pacific/Yap" },
    { "viewValue": "Poland", "value": "Poland" },
    { "viewValue": "Portugal", "value": "Portugal" },
    { "viewValue": "ROC", "value": "ROC" },
    { "viewValue": "ROK", "value": "ROK" },
    { "viewValue": "Singapore", "value": "Singapore" },
    { "viewValue": "Turkey", "value": "Turkey" }
  ]


  timezoneSelect = "Asia/Tehran"
  timePlace = "Tehran"


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
      this.mainServ.APIServ.get("consTimes/readCalander?ids=" + this.consId + "&dateStart=" + from + "&dateEnd=" + to, this.token).subscribe((data: any) => {
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


            x['date'] = x['start'].getFullYear() + "-" + (x['start'].getMonth() + 1) + "-" + x['start'].getDate();

            var dateStartString = x['start'].getFullYear() + "-" + x['start'].getMonth() + "-" + x['start'].getDate()
              + " " + x['start'].getHours() + ":" + x['start'].getMinutes();
            x['bodyStart'] = moment(dateStartString).tz('Asia/Tehran').format('hh : mm');


            var dateEndString = x['end'].getFullYear() + "-" + x['end'].getMonth() + "-" + x['end'].getDate()
              + " " + x['end'].getHours() + ":" + x['end'].getMinutes();
            x['bodyEnd'] = moment(dateEndString).tz('Asia/Tehran').format('hh : mm');


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
      this.events.forEach(x => {
        x['date'] = x['start'].getFullYear() + "-" + x['start'].getMonth() + "-" + x['start'].getDate();

        var dateStartString = x['start'].getFullYear() + "-" + x['start'].getMonth() + "-" + x['start'].getDate()
          + " " + x['start'].getHours() + ":" + x['start'].getMinutes();
        x['bodyStart'] = moment(dateStartString).tz('Asia/Tehran').format('hh : mm');


        var dateEndString = x['end'].getFullYear() + "-" + x['end'].getMonth() + "-" + x['end'].getDate()
          + " " + x['end'].getHours() + ":" + x['end'].getMinutes();
        x['bodyEnd'] = moment(dateEndString).tz('Asia/Tehran').format('hh : mm');
        this.bodyevents.push(x);

      });
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
  jun = moment("2015-5-2 4:30");// creating obj.

  ngOnInit() {

    this.jun.tz('Asia/Tehran').format('yyyy - MM - dd hh : mm : ss a z');
    console.log(this.jun);
    console.log(moment.tz.names()); // for all time zone.

    var id = this.route.snapshot.paramMap.get('id');
    this.token = this.route.snapshot.paramMap.get('token');
    this.mainServ.APIServ.get("forms/getClientForm/" + id, this.token).subscribe((data: any) => {
      if (this.mainServ.APIServ.getErrorCode() == 0) {
        this.form = data['getClientForm'];
        this.consId = this.form['consId'];
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
    this.dialogSer.confirmationMessage('Do you want to use the appointment in a date ' + appointment['date'] + " from " + appointment['bodyStart'] + " o\'clock  to " + appointment['bodyEnd'] + " at " + this.timePlace + " time." + 'in ' + appointment['meta']['location'], "forms/selectAp/" + this.form['id'], { 'apId': appointment['meta']['id'] }, false, function () {
      mainThis.mainServ.globalServ.reload();
    }, "put")
  }

  changeTimezone(timezone, timePlace) {
    this.timePlace = timezone;
    for (var index = 0; index < this.bodyevents.length; index++) {
      var element = this.bodyevents[index];

      var dateStartString = element['start'].getFullYear() + "-" + element['start'].getMonth() + "-" + element['start'].getDate()
        + " " + element['start'].getHours() + ":" + element['start'].getMinutes();
      this.bodyevents[index]['bodyStart'] = moment(dateStartString).tz(timezone).format('HH : mm');


      var dateEndString = element['end'].getFullYear() + "-" + element['end'].getMonth() + "-" + element['end'].getDate()
        + " " + element['end'].getHours() + ":" + element['end'].getMinutes();
      element['bodyEnd'] = moment(dateEndString).tz(timezone).format('HH : mm');

    };
  }
}
