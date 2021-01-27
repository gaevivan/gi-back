import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { SignInPageRoutingModule } from './sign-in-page-routing.module';
import { SignInPageComponent } from './sign-in-page.component';

@NgModule({
  declarations: [SignInPageComponent],
  imports: [SharedModule, SignInPageRoutingModule],
})
export class SignInPageModule {}
