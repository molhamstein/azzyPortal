import { ResponseSelectSloteComponent } from './main/content/dialogs/respone-select-slote/response-select-slote.component';
import { viewEventComponent } from './main/content/dialogs/view-event/view-event.component';
import { ConfirmAddFormComponent } from './main/content/dialogs/confirm-add-form/confirm-add-form.component';
import { AddApointmentComponent } from './main/content/dialogs/add-apointment/add-apointment.component';
import { DeleteAppointmentComponent } from './main/content/dialogs/delete-appointment/delete-appointment.component';
import { LoaderServicesService } from './core/services/loader-services.service';
import { ResetPasswordComponent } from './main/content/dialogs/reset-password/reset-password.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { AddSlotesComponent } from './main/content/dialogs/add-slotes/add-slotes.component';
import { ResponeFormComponent } from './main/content/dialogs/respone-form/respone-form.component';
import { ViewAppointmentComponent } from './main/content/dialogs/view-appointment/view-appointment.component';
import { DialogServiceService } from './core/services/dialog-service.service';
import { AuthGuardService } from './core/services/auth-guard-service.service';
import { ConfirmMessageComponent } from './main/content/dialogs/confirm-message/confirm-message.component';
import { SetTextBoxAdminComponent } from './main/content/dialogs/set-text-box-admin/set-text-box-admin.component';
import { EditClientFormModule } from './main/content/editClient-form/editClient-form.module';
import { EditFormModule } from './main/content/edit-form/edit-form.module';
import { GlobalService } from './core/services/global.service';
import { LoginService } from './core/services/login.service';
import { CallApiService } from './core/services/call-api.service';
import { MainService } from './core/services/main.service';
import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import 'hammerjs';
import { SharedModule } from './core/modules/shared.module';
import { AppComponent } from './app.component';
import { FuseMainModule } from './main/main.module';
import { FuseSplashScreenService } from './core/services/splash-screen.service';
import { FuseConfigService } from './core/services/config.service';
import { FuseNavigationService } from './core/components/navigation/navigation.service';
import { FuseSampleModule } from './main/content/sample/sample.module';
import { AdviceFormModule } from './main/content/advice-form/advice-form.module';
import { TranslateModule } from '@ngx-translate/core';
import { AppDirectionService } from './app-direction.service';
import { MyCalendarModule } from './main/content/calendar/calendar.module';
import { MatDialogModule } from '@angular/material/dialog';

// import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { Angular5TimePickerModule } from 'angular5-time-picker';
import { MomentTimezoneModule } from 'angular-moment-timezone';

import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MessageComponent } from './main/content/dialogs/message/message.component';
import { MAT_DATE_LOCALE } from '@angular/material';
import { SuccessMessageComponent } from './main/content/dialogs/success-message/success-message.component';
import { CustomSnackBarComponent } from './core/components/custom-snack-bar/custom-snack-bar.component';



const appRoutes: Routes = [
    // {
    //     path      : '**',
    //     redirectTo: 'sample'
    // }
];

@NgModule({
    declarations: [
        AppComponent, ResetPasswordComponent, ResponeFormComponent, ConfirmAddFormComponent, SuccessMessageComponent, AddSlotesComponent, SetTextBoxAdminComponent, MessageComponent, ConfirmMessageComponent, ResponseSelectSloteComponent, ViewAppointmentComponent,
        DeleteAppointmentComponent, AddApointmentComponent, viewEventComponent, CustomSnackBarComponent,
    ],
    imports: [
        BrowserModule,
        HttpModule,
        HttpClientModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(appRoutes),
        Angular5TimePickerModule,
        SharedModule,
        TranslateModule.forRoot(),
        FuseMainModule,
        MatDialogModule,
        ColorPickerModule,
        MomentTimezoneModule
        // OwlDateTimeModule,
        // OwlNativeDateTimeModule,
    ],
    entryComponents: [ViewAppointmentComponent, ResponseSelectSloteComponent, ConfirmAddFormComponent, ResetPasswordComponent, AddSlotesComponent, ResponeFormComponent, SetTextBoxAdminComponent,
        ConfirmMessageComponent, MessageComponent, DeleteAppointmentComponent, AddApointmentComponent, viewEventComponent, SuccessMessageComponent,CustomSnackBarComponent],

    providers: [
        { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
        { provide: LOCALE_ID, useValue: "en-GB" },
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        FuseSplashScreenService,
        FuseConfigService,
        FuseNavigationService,
        AppDirectionService,
        MainService,
        CallApiService,
        LoginService,
        GlobalService,
        AuthGuardService,
        DialogServiceService,
        LoaderServicesService
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
