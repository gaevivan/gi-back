import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';
import { FilesPageComponent } from './files-page.component';
import { FilesPageRoutingModule } from './files-page-routing.module';
import { FilesPageService } from './files-page.service';


@NgModule({
  declarations: [FilesPageComponent],
  imports: [
    CommonModule,
    SharedModule,
    FilesPageRoutingModule
  ],
  providers: [
    FilesPageService
  ]
})
export class FilesPageModule { }
