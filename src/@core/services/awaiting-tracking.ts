import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import environment from '@env/environment';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/catch';

@Injectable()
export class AwaitingTrackingService {
  constructor(private http: HttpClient){}

  getAwaiting($sessionId: string): Observable<any> {
    return this.http.get(environment.CONST.URL + '/getAwaiting?session='+ $sessionId)
      .catch((err) => {
        return err;
      })
  }

  removeTracking($sessionId: string, $packageId: number): Observable<any> {
    return  this.http.delete(environment.CONST.URL + '/removeTracking')
      .catch((err) => {
        return err;
      })
  }
}
