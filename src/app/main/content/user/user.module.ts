import { editUserComponent } from './editUser/editUser.component';
import { addUserComponent } from './addUser/addUser.component';
import { usersComponent } from './users/users.component';
import { AuthGuardService } from './../../../core/services/auth-guard-service.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../core/modules/shared.module';
import { RouterModule } from '@angular/router';

const routes = [
  {
    path: 'users',
    component: usersComponent,
    canActivate: [AuthGuardService]
  },
    {
    path: 'addUser',
    component: addUserComponent,
    canActivate: [AuthGuardService]
  },
    {
    path: 'editUser/:id',
    component: editUserComponent,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),

  ],
  declarations: [usersComponent,addUserComponent,editUserComponent]
})
export class AzzyUserModule { }
