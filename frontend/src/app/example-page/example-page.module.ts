import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExamplePageRoutingModule } from './example-page-routing.module';
import { ExamplePageComponent } from './example-page.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [ExamplePageComponent],
  imports: [
    CommonModule,
    SharedModule,
    ExamplePageRoutingModule
  ]
})
export class ExamplePageModule { }
