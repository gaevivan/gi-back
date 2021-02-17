import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';
import { LinksPageRoutingModule } from './links-page-routing.module';
import { LinksPageComponent } from './links-page.component';
import { LinksPageService } from './links-page.service';


@NgModule({
  declarations: [LinksPageComponent],
  imports: [
    CommonModule,
    SharedModule,
    LinksPageRoutingModule
  ],
  providers: [
    LinksPageService
  ]
})
export class LinksPageModule { }
