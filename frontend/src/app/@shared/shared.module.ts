import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, PipeTransform, Type } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ErrorsMessagePipe } from '@shared/pipes/errors-message.pipe';
import { CredentialsFooterComponent } from './components/credentials-footer/credentials-footer.component';

const BASE_MODULES: Type<NgModule>[] = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  HttpClientModule,
  RouterModule
];

const PIPES: Type<PipeTransform>[] = [ErrorsMessagePipe];

const COMPONENTS: Type<any>[] = [CredentialsFooterComponent];

@NgModule({
  declarations: [...PIPES, ...COMPONENTS],
  imports: [...BASE_MODULES],
  exports: [...BASE_MODULES, ...PIPES, ...COMPONENTS],
})
export class SharedModule {}
