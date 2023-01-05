
import { AuthGuardService } from './../../../core/services/auth-guard-service.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../core/modules/shared.module';
import { RouterModule } from '@angular/router';
import { ContractTypeComponent } from './contract-type/contract-type.component';
import { AddContractTypeComponent } from './add-contract-type/add-contract-type.component';
import { EditContractTypeComponent } from './edit-contract-type/edit-contract-type.component';

const routes = [
  {
    path: 'contract-type',
    component: ContractTypeComponent,
    canActivate: [AuthGuardService]
  },
    {
    path: 'add-contract-type',
    component: AddContractTypeComponent,
    canActivate: [AuthGuardService]
  },
    {
    path: 'edit-contract-type/:id',
    component: EditContractTypeComponent,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),

  ],
  declarations: [ContractTypeComponent, AddContractTypeComponent,EditContractTypeComponent]
})
export class AzzyContractTypeModule { }
