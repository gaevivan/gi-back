import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxsModule } from '@ngxs/store';
import { CurrentUserState } from '@shared/stores/current-user/current-user.state';
import { SignInPageModule } from './sign-in-page/sign-in-page.module';
import { SignUpPageModule } from './sign-up-page/sign-up-page.module';
import { ExamplePageModule } from './example-page/example-page.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SignInPageModule,
    SignUpPageModule,
    ExamplePageModule,
    SharedModule,
    NgxsModule.forRoot([CurrentUserState]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
