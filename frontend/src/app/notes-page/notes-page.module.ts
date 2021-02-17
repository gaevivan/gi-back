import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';
import { NotesPageComponent } from './notes-page.component';
import { NotesPageRoutingModule } from './notes-page-routing.module';
import { NotesPageService } from './notes-page.service';


@NgModule({
  declarations: [NotesPageComponent],
  imports: [
    CommonModule,
    SharedModule,
    NotesPageRoutingModule
  ],
  providers: [NotesPageService]
})
export class NotesPageModule { }
