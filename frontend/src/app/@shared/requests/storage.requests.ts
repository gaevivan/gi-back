import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class StorageRequests {
  constructor(private readonly http: HttpClient) {}

  public select(): Observable<any> {
    const body = {entity: 'users'};
    return this.http.post('http://localhost:3000/api/select', body);
  }
}