import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/catch';

@Injectable()
export class CartuService {
  constructor(private http: HttpClient){

  }

  pay(data){
    return this.http.post('https://e-commerce.cartubank.ge/servlet/Process3DSServlet/3dsproxy_init.jsp', data);
  }

}
