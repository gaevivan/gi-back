import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { isNil } from '@shared/functions/is-nil.function';
import { TokenObject } from '@shared/interfaces/token-object.interface';
import { AuthState } from '@shared/stores/auth/auth.state';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  public readonly isAuthorized$: Observable<boolean> = this.store.select(
    AuthState
  ).pipe(
    map((tokenObject: TokenObject) => !isNil(tokenObject))
  );

  constructor(private readonly store: Store) {}
}
