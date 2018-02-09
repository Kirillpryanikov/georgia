import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import environment from '@env/environment';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/catch';

@Injectable()
export class AwaitingTrackingService {
  constructor(private http: HttpClient){}

  getAwaiting(): Observable<any> {
    return this.http.get(environment.CONST.URL + '/getAwaiting')
      .catch((err) => {
        return err;
      })
  }
}
