import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExamplePageRoutingModule } from './example-page-routing.module';
import { ExamplePageComponent } from './example-page.component';


@NgModule({
  declarations: [ExamplePageComponent],
  imports: [
    CommonModule,
    ExamplePageRoutingModule
  ]
})
export class ExamplePageModule { }
