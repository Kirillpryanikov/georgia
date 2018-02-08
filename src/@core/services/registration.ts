import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import environment from '@env/environment';

@Injectable()
export class RegistrationService {
  constructor(private http: HttpClient){}

  registration(form: FormData): Observable<any> {
    return this.http.post(environment.CONST.URL, form);
  }
}
