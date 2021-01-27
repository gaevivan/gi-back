import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorsMessagePipe } from '@shared/pipes/errors-message.pipe';

@NgModule({
  declarations: [ErrorsMessagePipe],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    ErrorsMessagePipe,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class SharedModule {}
