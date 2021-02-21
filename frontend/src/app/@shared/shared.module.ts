import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpInterceptor } from '@angular/common/http';
import { NgModule, PipeTransform, Type } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ErrorsMessagePipe } from '@shared/pipes/errors-message.pipe';
import { CredentialsFooterComponent } from './components/credentials-footer/credentials-footer.component';
import { NavigationHeaderComponent } from './components/navigation-header/navigation-header.component';
import { MatIconModule } from '@angular/material/icon';
import { MenuComponent } from './components/menu/menu.component';
import { AddHttpPipe } from './pipes/add-http.pipe';
import { AccountMenuComponent } from './components/account-menu/account-menu.component';

const BASE_MODULES: Type<NgModule>[] = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  HttpClientModule,
  RouterModule,
  MatIconModule,
];

const PIPES: Type<PipeTransform>[] = [ErrorsMessagePipe, AddHttpPipe];

const COMPONENTS: Type<any>[] = [
  CredentialsFooterComponent,
  NavigationHeaderComponent,
  MenuComponent,
  AccountMenuComponent
];

const INTERCEPTORS: Type<HttpInterceptor>[] = [
  // TokenInterceptor
];

@NgModule({
  declarations: [...PIPES, ...COMPONENTS],
  imports: [...BASE_MODULES],
  exports: [...BASE_MODULES, ...PIPES, ...COMPONENTS],
  providers: [INTERCEPTORS],
})
export class SharedModule {}
