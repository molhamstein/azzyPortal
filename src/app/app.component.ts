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


    constructor(
        private fuseSplashScreen: FuseSplashScreenService,
        private translate: TranslateService,
        private dir: AppDirectionService
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
        this.translate.setDefaultLang('fa');

        // Use a language
        this.translate.use('fa');
    }
}
