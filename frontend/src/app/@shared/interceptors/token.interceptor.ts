import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { isNil } from '@shared/functions/is-nil.function';
import { CurrentUserTokenState } from '@shared/stores/current-user-token/current-user-token.state';
import { Uuid } from '@shared/types/uuid.type';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TokenInterceptor implements HttpInterceptor {
  constructor(private store: Store) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token: Uuid = this.store.selectSnapshot<Uuid>(CurrentUserTokenState);
    if (isNil(token)) {
      return next.handle(request);
    }

    request = request.clone({
      setHeaders: {
        Authorization: token,
      },
    });

    return next.handle(request);
  }
}
