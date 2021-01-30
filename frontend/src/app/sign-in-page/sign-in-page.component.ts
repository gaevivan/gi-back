import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngxs/store';
import { CurrentUserActions } from '@shared/stores/current-user/current-user.actions';

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

  constructor(private readonly store: Store) {
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
    this.store.dispatch(new CurrentUserActions.SignIn(this.authControl.value));
  }
}
