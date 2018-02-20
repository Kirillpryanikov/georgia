import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import environment from '@env/environment';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/catch';

@Injectable()
export class AwaitingTrackingService {

  private listAwaitingTracking = [
    {
      package_id:7965559,
      "tracking":"6667778889",
      "client_comment":"",
      insurance: 0,
      "global_repacking":"1",
      cut_down: 0,
      put_into_bag: 1,
      "declared":1
    },
    {
      package_id:7965800,
      "tracking":"6667778001",
      "client_comment":"My wife's shoes",
      insurance: 1,
      "global_repacking":"1",
      cut_down: 0,
      put_into_bag: 1,
      "declared":1
    },
    {
      package_id:7965559,
      "tracking":"6667778889",
      "client_comment":"",
      insurance: 0,
      "global_repacking":"1",
      cut_down: 0,
      put_into_bag: 1,
      "declared":1
    }
  ];
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

  addTracking() {

  }

  getAwaitingTracking() {
    return this.listAwaitingTracking;
  }
}
