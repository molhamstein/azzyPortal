import { SharedModule } from './../../../core/modules/shared.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuseLoginComponent } from './login.component';

const routes = [
    {
        path     : 'login',
        component: FuseLoginComponent
    }
];

@NgModule({
    declarations: [
        FuseLoginComponent
    ],
    imports     : [
        SharedModule,
        RouterModule.forRoot(routes,{useHash: true})
    ]
})

export class LoginModule
{

}
