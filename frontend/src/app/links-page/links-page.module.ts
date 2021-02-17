import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';
import { LinksPageRoutingModule } from './links-page-routing.module';
import { LinksPageComponent } from './links-page.component';


@NgModule({
  declarations: [LinksPageComponent],
  imports: [
    CommonModule,
    SharedModule,
    LinksPageRoutingModule
  ]
})
export class LinksPageModule { }
