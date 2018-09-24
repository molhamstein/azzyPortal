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
import { NgModule } from '@angular/core';
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



const appRoutes: Routes = [
    // {
    //     path      : '**',
    //     redirectTo: 'sample'
    // }
];

@NgModule({
    declarations: [
        AppComponent, ResetPasswordComponent,ResponeFormComponent, AddSlotesComponent, SetTextBoxAdminComponent, ConfirmMessageComponent, ViewAppointmentComponent
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
        ColorPickerModule
        // OwlDateTimeModule,
        // OwlNativeDateTimeModule,
    ],
    entryComponents: [ViewAppointmentComponent,ResetPasswordComponent, AddSlotesComponent, ResponeFormComponent, SetTextBoxAdminComponent, ConfirmMessageComponent],

    providers: [
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
