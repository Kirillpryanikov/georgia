import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import environment from '@env/environment';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/catch';

@Injectable()
export class HeaderService {
  constructor(private http: HttpClient){}

  getInfo(): Observable<any> {
    return this.http.get(environment.CONST.URL + '/getInfo')
      .catch((err) => {
        return err;
      })
  }

  getNotification(): Observable<any> {
    return this.http.get(environment.CONST.URL + '/getNotification')
      .catch((err) => {
        return err;
      })
  }

  loadLanguagePack(): Observable<any> {
    return this.http.get(environment.CONST.URL + '/loadLanguagePack')
      .catch((err) => {
        return err;
      })
  }
}
