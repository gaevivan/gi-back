import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '@shared/constants/api-url.constant';
import { VOID } from '@shared/constants/void.constant';
import { Entities } from '@shared/enums/entity.enum';
import { Entity } from '@shared/interfaces/entity.inteface';
import { RequestBody } from '@shared/namespaces/request-body.namespace';
import { Uuid } from '@shared/types/uuid.type';
import { Observable } from 'rxjs';
import { mapTo } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class StorageRequests {
  constructor(private readonly http: HttpClient) {}

  public entity(body: RequestBody.Entity): Observable<Entity> {
    return this.http.post<Entity>(`${API_URL}/entity`, body);
  }

  public select<T = unknown>(body: RequestBody.Select): Observable<T[]> {
    return this.http.post<T[]>(`${API_URL}/select`, body);
  }

  public create<T>(body: RequestBody.Create<T>): Observable<Uuid[]> {
    return this.http.post<Uuid[]>(`${API_URL}/create`, body);
  }

  public update<T>(body: RequestBody.Update<T>): Observable<any> {
    return this.http.post(`${API_URL}/update`, body).pipe(mapTo(VOID));
  }

  public delete(body: RequestBody.Delete): Observable<any> {
    return this.http.post(`${API_URL}/delete`, body).pipe(mapTo(VOID));
  }
}
