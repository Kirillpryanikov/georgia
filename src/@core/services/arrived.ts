import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import environment from '@env/environment';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/catch';

@Injectable()
export class ArrivedService {
  constructor(private http: HttpClient){}

  getArrived(): Observable<any> {
    return this.http.get(environment.CONST.URL + '/getArrived')
      .catch((err) => {
        return err;
      })
  }
}
