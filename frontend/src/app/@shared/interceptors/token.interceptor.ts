import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { isNil } from '@shared/functions/is-nil.function';
import { TokenObject } from '@shared/interfaces/token-object.interface';
import { AuthState } from '@shared/stores/auth/auth.state';
import { Uuid } from '@shared/types/uuid.type';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TokenInterceptor implements HttpInterceptor {
  constructor(private store: Store) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const tokenObject: TokenObject = this.store.selectSnapshot<TokenObject>(
      AuthState
    );
    const token: Uuid = tokenObject?.token;
    if (isNil(token)) {
      return next.handle(request);
    }

    request = request.clone({
      setHeaders: {
        token,
      },
    });

    return next.handle(request);
  }
}
