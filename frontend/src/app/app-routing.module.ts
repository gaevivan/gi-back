import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanActiveService } from '@shared/services/can-activate.service';
import { ExamplePageComponent } from './example-page/example-page.component';
import { SignInPageComponent } from './sign-in-page/sign-in-page.component';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'example'
  },
  {
    path: 'sign-in',
    canActivate: [CanActiveService],
    component: SignInPageComponent
  },
  {
    path: 'sign-up',
    canActivate: [CanActiveService],
    component: SignUpPageComponent
  },
  {
    path: 'example',
    canActivate: [CanActiveService],
    component: ExamplePageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
