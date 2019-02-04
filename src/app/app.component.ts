import { ActivatedRoute } from '@angular/router';
import { MainService } from './core/services/main.service';
import { Component } from '@angular/core';
import { FuseSplashScreenService } from './core/services/splash-screen.service';
import { AppDirectionService } from './app-direction.service';
import { Direction } from '@angular/cdk/bidi';
import { Subscription } from 'rxjs/Subscription';
import { TranslateService } from '@ngx-translate/core';


@Component({
    selector: 'fuse-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    /** Whether the widget is in RTL mode or not. */
    appDirection: Direction;
    /** Subscription to the Directionality change EventEmitter. */
    private _dirChangeSubscription = Subscription.EMPTY;
    loader = this.mainSer.getLodaer();

    constructor(
        private fuseSplashScreen: FuseSplashScreenService,
        private translate: TranslateService,
        private dir: AppDirectionService,
        private mainSer: MainService,
        private route: ActivatedRoute
    ) {
        this.appDirection = dir.getDir();

        // this._dirChangeSubscription = dir.change.subscribe(() => {
        //     // this.flipDirection();
        //     // 
        //     this.appDirection = dir.value;
        //     console.log('dir changed');
        // });

        this._dirChangeSubscription = dir.change.subscribe(() => {
            // this.flipDirection();
            // 
            // this.appDirection = dir.value;
            this.appDirection = dir.getDir();
            console.log('dir changed');
        });



        // Add languages
        this.translate.addLangs(['en', 'fa']);

        // Set the default language
        this.translate.setDefaultLang('en');

        // Use a language

        var lang = this.getParameterByName('lang', null)

        if (lang == undefined || lang == "") {
            lang = this.mainSer.loginServ.getlang();
            if (lang != null && lang != "") {
                this.translate.use(lang);
                if (lang == "fa")
                    this.dir.switchDir("rtl");
            }
            else {
                this.mainSer.loginServ.setLang("en")
            }
        } else {
            if (lang == "fa")
                this.dir.switchDir("rtl");
            // else
            //     this.dir.switchDir("rtl");

            this.mainSer.loginServ.setLang(lang)
            this.translate.use(lang);
        }


    }

    getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }
}
