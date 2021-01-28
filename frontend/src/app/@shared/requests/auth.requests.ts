import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '@shared/constants/api-url.constant';
import { VOID } from '@shared/constants/void.constant';
import { AuthInfo } from '@shared/interfaces/auth-info.interface';
import { UserWithToken } from '@shared/interfaces/user-with-token.interface';
import { Uuid } from '@shared/types/uuid.type';
import { Observable } from 'rxjs';
import { mapTo } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthRequests {
  constructor(private readonly http: HttpClient) {}

  public signIn(authInfo: AuthInfo): Observable<UserWithToken> {
    return this.http.post<UserWithToken>(`${API_URL}/signIn`, authInfo);
  }

  public signUp(authInfo: AuthInfo): Observable<UserWithToken> {
    return this.http.post<UserWithToken>(`${API_URL}/signUp`, authInfo);
  }

  public signOut(token: Uuid): Observable<void> {
    return this.http.post(`${API_URL}/signOut`, { token }).pipe(mapTo(VOID));
  }
}
