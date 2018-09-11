import { AuthGuardService } from './../../../core/services/auth-guard-service.service';
import { ContractedFormsComponent } from './contracted-forms/contracted-forms.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../core/modules/shared.module';
import { UnprocessedFormsComponent } from './unprocessed-forms/unprocessed-forms.component';
import { RouterModule } from '@angular/router';
import { ProcessedFormsComponent } from './processed-forms/processed-forms.component';
import { ShowFormComponent } from './show-form/show-form.component';

const routes = [
  {
    path: 'unprocessed',
    component: UnprocessedFormsComponent,
    canActivate: [AuthGuardService]
  
},
  {
    path: 'processed',
    component: ProcessedFormsComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'contracted',
    component: ContractedFormsComponent,
    canActivate: [AuthGuardService]
    
  },
  {
    path: 'show-form/:id',
    component: ShowFormComponent,
    canActivate: [AuthGuardService]

  }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),

  ],
  declarations: [UnprocessedFormsComponent, ProcessedFormsComponent, ContractedFormsComponent, ShowFormComponent]
})
export class AzzyFormsModule { }
