import { MainService } from './../../core/services/main.service';
import { Component } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { FuseConfigService } from '../../core/services/config.service';
import { AppDirectionService } from '../../app-direction.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'fuse-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss']
})

export class FuseToolbarComponent {
    userStatusOptions: any[];
    languages: any;
    selectedLanguage: any;
    showLoadingBar: boolean;
    horizontalNav: boolean;
    userName: String;

    constructor(
        private router: Router,
        private fuseConfig: FuseConfigService,
        private translate: TranslateService,
        private appDirection: AppDirectionService,
        private mainServ: MainService

    ) {
        this.userName = this.mainServ.loginServ.getuserName()
        this.userStatusOptions = [
            {
                'title': 'Online',
                'icon': 'icon-checkbox-marked-circle',
                'color': '#4CAF50'
            },
            {
                'title': 'Away',
                'icon': 'icon-clock',
                'color': '#FFC107'
            },
            {
                'title': 'Do not Disturb',
                'icon': 'icon-minus-circle',
                'color': '#F44336'
            },
            {
                'title': 'Invisible',
                'icon': 'icon-checkbox-blank-circle-outline',
                'color': '#BDBDBD'
            },
            {
                'title': 'Offline',
                'icon': 'icon-checkbox-blank-circle-outline',
                'color': '#616161'
            }
        ];

        this.languages = [
            {
                'id': 'fa',
                'title': 'Persian',
                'flag': 'ir',
                'dir': 'rtl'
            },
            {
                'id': 'en',
                'title': 'English',
                'flag': 'us',
                'dir': 'ltr'
            }

            // ,
            // {
            //     'id'   : 'tr',
            //     'title': 'Turkish',
            //     'flag' : 'tr'
            // }
        ];
        if (this.mainServ.loginServ.getlang() == "en")
            this.selectedLanguage = this.languages[1];
        else
            this.selectedLanguage = this.languages[0];

        console.log(this.languages);
        router.events.subscribe(
            (event) => {
                if (event instanceof NavigationStart) {
                    this.showLoadingBar = true;
                }
                if (event instanceof NavigationEnd) {
                    this.showLoadingBar = false;
                }
            });

        this.fuseConfig.onSettingsChanged.subscribe((settings) => {
            this.horizontalNav = settings.layout.navigation === 'top';
        });

    }

    search(value) {
        // Do your search here...
        console.log(value);
    }

    setLanguage(lang) {
        // Set the selected language for toolbar

        this.selectedLanguage = lang;

        // Use the selected language for translations
        this.translate.use(lang.id);
        console.log("lang")
        console.log(lang)
        this.appDirection.switchDir(lang.dir);
        console.log(window.location.href);  // whatever your current location href is
        var templang = window.location.href
        if (templang.includes("lang=fa")) {
            console.log("includes(lang=fa)")
            templang = templang.replace("lang=fa", "lang=" + lang.id);
        } else if (templang.includes("lang=en")) {
            console.log("includes(lang=en)")
            templang = templang.replace("lang=en", "lang=" + lang.id);
        } else {
            console.log("dosent include any thing")
            templang = templang += "?lang=" + lang.id
        }
        if (templang.includes("http://localhost:4200"))
            templang = templang.replace("http://localhost:4200", "");
        else if (templang.includes("https://jawlatcom.com/portal"))
            templang = templang.replace("https://jawlatcom.com/portal", "");
        console.log(templang);
        window.history.replaceState({}, templang, templang);
        console.log(window.location.href);  // oh, hey, it replaced the path with /foo

        this.mainServ.loginServ.setLang(lang.id)
    }

    logOut() {
        this.mainServ.loginServ.logout();
    }
}
