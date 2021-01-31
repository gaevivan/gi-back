import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { AuthActions } from '@shared/stores/auth/auth.actions';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.scss'],
})
export class SignUpPageComponent {
  public readonly loginControl: FormControl = new FormControl('', [
    Validators.minLength(4),
    Validators.required,
  ]);
  public readonly passwordControl: FormControl = new FormControl('', [
    Validators.minLength(6),
    Validators.required,
  ]);
  public readonly verifiedPasswordControl: FormControl = new FormControl('', [
    Validators.minLength(6),
    Validators.required,
    this.samePass.bind(this),
  ]);
  public readonly authControl: FormGroup = this.getDefaultForm();

  constructor(private readonly store: Store, private readonly router: Router) {
    this.authControl = this.getDefaultForm();
  }

  private getDefaultForm(): FormGroup {
    const authControlStructure: { [key: string]: AbstractControl } = {
      login: this.loginControl,
      password: this.passwordControl,
      verifiedPassword: this.verifiedPasswordControl,
    };
    return new FormGroup(authControlStructure);
  }

  public signUp(): void {
    this.store
      .dispatch(new AuthActions.SignUp(this.authControl.value))
      .subscribe(() => this.router.navigateByUrl('/example'));
  }

  private samePass(control: AbstractControl): ValidationErrors | null {
    const verifiedPassword: string = control.value;
    const password: string = this.passwordControl.value;
    return verifiedPassword === password
      ? null
      : { wrongVerificationPassword: true };
  }
}
