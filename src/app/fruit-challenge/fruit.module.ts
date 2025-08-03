import { NgModule } from '@angular/core';

import { FruitDialogComponent } from './components/fruit-dialog/fruit-dialog';
import { FruitTableComponent } from './components/fruit-table/fruit-table.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    FruitTableComponent,
    FruitDialogComponent,
  ],
  imports: [
    SharedModule,
  ],
  exports: [
    FruitTableComponent
  ]
})
export class FruitModule { }