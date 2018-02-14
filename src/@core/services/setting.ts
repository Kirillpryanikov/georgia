import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import environment from '@env/environment';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/catch';

@Injectable()
export class SettingService {
  constructor(private http: HttpClient){}

  changeCustomerSettings(data): Observable<any> {
    return this.http.post(environment.CONST.URL + '/changeCustomerSettings', data)
      .catch((err) => {
        return err;
      })
  }
}
