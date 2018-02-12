import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import environment from '@env/environment';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/catch';

@Injectable()
export class PendingService {
  constructor(private http: HttpClient){}

  getPending(): Observable<any> {
    return this.http.get(environment.CONST.URL + '/getPending')
      .catch((err) => {
        return err;
      })
  }
}
