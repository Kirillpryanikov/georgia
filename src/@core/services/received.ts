import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import environment from '@env/environment';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/catch';

@Injectable()
export class ReceivedService {
  constructor(private http: HttpClient){}

  getReceived(): Observable<any> {
    return this.http.get(environment.CONST.URL + '/getReceived')
      .catch((err) => {
        return err;
      })
  }
}
