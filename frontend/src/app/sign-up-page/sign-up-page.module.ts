import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { SignUpPageRoutingModule } from './sign-up-page-routing.module';
import { SignUpPageComponent } from './sign-up-page.component';

@NgModule({
  declarations: [SignUpPageComponent],
  imports: [
    SharedModule,
    SignUpPageRoutingModule,
  ],
})
export class SignUpPageModule {}
