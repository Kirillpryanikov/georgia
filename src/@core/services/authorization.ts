import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import environment from '@env/environment';
import { Observable } from "rxjs/Observable";


@Injectable()
export class AuthorizationService {
  constructor(private http: HttpClient){}

  authorization(form: FormData): Observable<any> {
    return this.http.post(environment.CONST.URL, form);
  }
}
