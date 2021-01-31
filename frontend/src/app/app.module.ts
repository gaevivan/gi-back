import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsModule } from '@ngxs/store';
import { TokenInterceptor } from '@shared/interceptors/token.interceptor';
import { SharedModule } from '@shared/shared.module';
import { ApplicationsState } from '@shared/stores/applications/applications.state';
import { AuthState } from '@shared/stores/auth/auth.state';
import { CurrentAppState } from '@shared/stores/current-app/current-app.state';
import { CurrentUserState } from '@shared/stores/current-user/current-user.state';
import { UsersState } from '@shared/stores/users/users.state';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExamplePageModule } from './example-page/example-page.module';
import { SignInPageModule } from './sign-in-page/sign-in-page.module';
import { SignUpPageModule } from './sign-up-page/sign-up-page.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SignInPageModule,
    SignUpPageModule,
    ExamplePageModule,
    SharedModule,
    NgxsModule.forRoot([
      CurrentAppState,
      AuthState,
      UsersState,
      CurrentUserState,
      ApplicationsState,
    ]),
    NgxsStoragePluginModule.forRoot({
      key: [AuthState],
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
