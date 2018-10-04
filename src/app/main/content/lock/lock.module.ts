import { FuseLockComponent } from './lock.component';
import { SharedModule } from './../../../core/modules/shared.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


const routes = [
    {
        path     : 'Permision',
        component: FuseLockComponent
    }
];

@NgModule({
    declarations: [
        FuseLockComponent
    ],
    imports     : [
        SharedModule,
        RouterModule.forChild(routes)
    ]
})

export class LockModule
{

}
