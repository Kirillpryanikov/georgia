import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import environment from '@env/environment';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/catch';

@Injectable()
export class DeclarationService {
  constructor(private http: HttpClient){}

  getDeclaration(package_id): Observable<any> {
    return this.http.post(environment.CONST.URL + '/getDeclaration',{package_id})
      .catch((err) => {
        return err;
      })
  }

  declareTracking(package_id, shiper, details): Observable<any> {
    return this.http.post(environment.CONST.URL + '/declareTracking', {package_id, shiper, details})
      .catch((err) => {
        return err;
      })
  }
}
