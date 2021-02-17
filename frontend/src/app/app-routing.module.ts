import { NgModule, Type } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActiveService } from '@shared/services/can-activate.service';
import { FilesPageModule } from './files-page/files-page.module';
import { LinksPageModule } from './links-page/links-page.module';
import { NotesPageModule } from './notes-page/notes-page.module';
import { SignInPageModule } from './sign-in-page/sign-in-page.module';
import { SignUpPageModule } from './sign-up-page/sign-up-page.module';
import { TasksPageModule } from './tasks-page/tasks-page.module';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'tasks'
  },
  {
    path: 'sign-in',
    canActivate: [CanActiveService],
    loadChildren: (): Promise<Type<SignInPageModule>> =>
      import('./sign-in-page/sign-in-page.module').then((module) => module.SignInPageModule),
  },
  {
    path: 'sign-up',
    canActivate: [CanActiveService],
    loadChildren: (): Promise<Type<SignUpPageModule>> =>
      import('./sign-up-page/sign-up-page.module').then((module) => module.SignUpPageModule),
  },
  {
    path: 'tasks',
    loadChildren: (): Promise<Type<TasksPageModule>> =>
      import('./tasks-page/tasks-page.module').then((module) => module.TasksPageModule),
  },
  {
    path: 'links',
    loadChildren: (): Promise<Type<LinksPageModule>> =>
      import('./links-page/links-page.module').then((module) => module.LinksPageModule),
  },
  {
    path: 'files',
    loadChildren: (): Promise<Type<FilesPageModule>> =>
      import('./files-page/files-page.module').then((module) => module.FilesPageModule),
  },
  {
    path: 'notes',
    loadChildren: (): Promise<Type<NotesPageModule>> =>
      import('./notes-page/notes-page.module').then((module) => module.NotesPageModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
