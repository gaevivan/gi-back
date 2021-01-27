import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.scss']
})
export class SignInPageComponent {

  public readonly loginControl: FormControl = new FormControl('', [Validators.minLength(4), Validators.required]);
  public readonly passwordControl: FormControl = new FormControl('', [Validators.minLength(6), Validators.required]);
  public readonly authControl: FormGroup = this.getDefaultForm();

  constructor() {
    this.authControl = this.getDefaultForm();
  }

  private getDefaultForm(): FormGroup {
    const authControlStructure: {[key: string]: AbstractControl} = {
      login: this.loginControl,
      password: this.passwordControl
    };
    return new FormGroup(authControlStructure);
  }

  public signIn(): void {
    console.log(this.authControl.value);
  }

}
