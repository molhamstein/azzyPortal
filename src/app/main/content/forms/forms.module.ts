import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../core/modules/shared.module';
import { UnprocessedFormsComponent } from './unprocessed-forms/unprocessed-forms.component';
import { RouterModule } from '@angular/router';
import { ProcessedFormsComponent } from './processed-forms/processed-forms.component';

const routes = [
  {
    path: 'unprocessed',
    component: UnprocessedFormsComponent,
  },
  {
    path: 'processed',
    component: ProcessedFormsComponent,
  }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),

  ],
  declarations: [UnprocessedFormsComponent, ProcessedFormsComponent]
})
export class AzzyFormsModule { }
