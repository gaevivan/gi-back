import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';
import { TasksPageComponent } from './tasks-page.component';
import { TasksPageRoutingModule } from './tasks-page-routing.module';
import { TasksPageService } from './tasks-page.service';
import { MenuComponent } from '@shared/components/menu/menu.component';


@NgModule({
  declarations: [TasksPageComponent, MenuComponent],
  imports: [
    CommonModule,
    SharedModule,
    TasksPageRoutingModule
  ],
  providers: [TasksPageService]
})
export class TasksPageModule { }
