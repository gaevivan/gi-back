import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { AuthActions } from '@shared/stores/auth/auth.actions';

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.scss'],
})
export class SignInPageComponent {
  public readonly loginControl: FormControl = new FormControl('', [
    Validators.minLength(4),
    Validators.required,
  ]);
  public readonly passwordControl: FormControl = new FormControl('', [
    Validators.minLength(6),
    Validators.required,
  ]);
  public readonly authControl: FormGroup = this.getDefaultForm();

  constructor(private readonly store: Store, private readonly router: Router) {
    this.authControl = this.getDefaultForm();
  }

  private getDefaultForm(): FormGroup {
    const authControlStructure: { [key: string]: AbstractControl } = {
      login: this.loginControl,
      password: this.passwordControl,
    };
    return new FormGroup(authControlStructure);
  }

  public signIn(): void {
    this.store
      .dispatch(new AuthActions.SignIn(this.authControl.value))
      .subscribe(() => this.router.navigateByUrl('/example'));
  }
}
