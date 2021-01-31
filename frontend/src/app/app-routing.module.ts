import { NgModule, Type } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActiveService } from '@shared/services/can-activate.service';
import { ExamplePageModule } from './example-page/example-page.module';
import { SignInPageModule } from './sign-in-page/sign-in-page.module';
import { SignUpPageModule } from './sign-up-page/sign-up-page.module';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'example'
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
    path: 'example',
    canActivate: [CanActiveService],
    loadChildren: (): Promise<Type<ExamplePageModule>> =>
      import('./example-page/example-page.module').then((module) => module.ExamplePageModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
