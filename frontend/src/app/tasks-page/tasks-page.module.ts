import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';
import { TasksPageComponent } from './tasks-page.component';
import { TasksPageRoutingModule } from './tasks-page-routing.module';
import { TasksPageService } from './tasks-page.service';


@NgModule({
  declarations: [TasksPageComponent],
  imports: [
    CommonModule,
    SharedModule,
    TasksPageRoutingModule
  ],
  providers: [TasksPageService]
})
export class TasksPageModule { }
