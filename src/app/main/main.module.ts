import { LockModule } from './content/lock/lock.module';
import { cancelAppointmentModule } from './content/cancel-appointment/cancel-appointment.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { AzzyUserModule } from './content/user/user.module';
import { EditClientFormModule } from './content/editClient-form/editClient-form.module';
import { EditFormModule } from './content/edit-form/edit-form.module';
import { LoginModule } from './content/login/login.module';

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../core/modules/shared.module';

import { FuseMainComponent } from './main.component';
import { FuseContentComponent } from './content/content.component';
import { FuseFooterComponent } from './footer/footer.component';
import { FuseNavbarVerticalComponent } from './navbar/vertical/navbar-vertical.component';
import { FuseToolbarComponent } from './toolbar/toolbar.component';
import { FuseNavigationModule } from '../core/components/navigation/navigation.module';
import { FuseNavbarVerticalToggleDirective } from './navbar/vertical/navbar-vertical-toggle.directive';
import { FuseNavbarHorizontalComponent } from './navbar/horizontal/navbar-horizontal.component';
import { FuseQuickPanelComponent } from './quick-panel/quick-panel.component';
import { FuseThemeOptionsComponent } from '../core/components/theme-options/theme-options.component';
import { FuseShortcutsModule } from '../core/components/shortcuts/shortcuts.module';
import { FuseSearchBarModule } from '../core/components/search-bar/search-bar.module';
import { CalendarModule } from '../angular-calendar';
import { MyCalendarModule } from './content/calendar/calendar.module';
import { TranslateModule } from '@ngx-translate/core';
import { AdviceFormModule } from './content/advice-form/advice-form.module';
import { FuseSampleModule } from './content/sample/sample.module';
import { AzzyFormsModule } from './content/forms/forms.module';
import { MyClientCalendarModule } from './content/client-calendar/client-calendar.module';
import { AzzyContractTypeModule } from './content/contract-type/contract-type.module';

@NgModule({
    declarations: [
        FuseContentComponent,
        FuseFooterComponent,
        FuseMainComponent,
        FuseNavbarVerticalComponent,
        FuseNavbarHorizontalComponent,
        FuseToolbarComponent,
        FuseNavbarVerticalToggleDirective,
        FuseThemeOptionsComponent,
        FuseQuickPanelComponent,

    ],
    imports: [
        NgxMatSelectSearchModule,
        SharedModule,
        RouterModule,
        FuseNavigationModule,
        FuseShortcutsModule,
        FuseSearchBarModule,
        CalendarModule.forRoot(),
        MyCalendarModule,
        FuseSampleModule,
        AdviceFormModule,
        cancelAppointmentModule,
        EditFormModule,
        EditClientFormModule,
        AzzyFormsModule,
        AzzyUserModule,
        AzzyContractTypeModule,
        MyClientCalendarModule,
        LoginModule,
        LockModule
        



    ],
    exports: [
        FuseMainComponent
    ]
})

export class FuseMainModule {
}
