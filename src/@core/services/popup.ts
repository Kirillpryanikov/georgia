import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import environment from '@env/environment';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/catch';

@Injectable()
export class PopupService {
  constructor(private http: HttpClient){}

  /**
   *
   * @param data = { $sessionId:string, $packageId:integer, $key:string, $value:integer }
   * string	$sessionId     - Session identifier returned by login function
   * integer	$packageId   - Package identifier
   * string	$key           - Possible values: INSURANCE|CUT_DOWN|PUT_INTO_BAG
   * integer	$value       - Possible values: 0|1 ( 0 - Off, 1 - On )
   *
   * @returns {Observable<any>}
   */
  changePackageSetting(package_id, key, value ): Observable<any> {
    return this.http.post(environment.CONST.URL + '/changePackageSetting', {package_id, key, value})
      .catch((err) => {
        return err;
      })
  }

  addTrackingComment(package_id, comment): Observable<any> {
    return this.http.post(environment.CONST.URL + '/addTrackingComment', {package_id, comment})
      .catch((err) => {
        return err;
      })
  }
}
