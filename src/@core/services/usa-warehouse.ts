import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import environment from '@env/environment';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/catch';

@Injectable()
export class UsaWarehouseService {
  constructor(private http: HttpClient){}

  getUsaWarehouse(): Observable<any> {
    return this.http.get(environment.CONST.URL + '/getUsaWarehouse')
      .catch((err) => {
        return err;
      })
  }
}
