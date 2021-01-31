import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '@shared/constants/api-url.constant';
import { VOID } from '@shared/constants/void.constant';
import { Sign } from '@shared/interfaces/sign.interface';
import { TokenObject } from '@shared/interfaces/token-object.interface';
import { User } from '@shared/interfaces/user.interface';
import { Observable } from 'rxjs';
import { mapTo } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthRequests {
  constructor(private readonly http: HttpClient) {}

  public signIn(sign: Sign): Observable<TokenObject> {
    return this.http.post<TokenObject>(`${API_URL}/signIn`, sign);
  }

  public signUp(sign: Sign): Observable<TokenObject> {
    return this.http.post<TokenObject>(`${API_URL}/signUp`, sign);
  }

  public signOut(): Observable<void> {
    return this.http.post(`${API_URL}/signOut`, {}).pipe(mapTo(VOID));
  }

  public getCurrentUser(): Observable<User> {
    return this.http.post<User>(`${API_URL}/currentUser`, {});
  }
}
