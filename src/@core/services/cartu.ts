import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import {Client, SOAPService} from "ngx-soap";
import {Subject} from "rxjs/Subject";

@Injectable()
export class CartuService {
  private client: Client;
  private getCartuDescriptorMessage = new Subject<any>();
  constructor(private http: HttpClient,
              private soap: SOAPService){

  }

  getCartuDescriptor(remote_function, data) {
    this.http.get('./assets/soap.wsdl',{responseType:"text"}).subscribe(response => {
      this.soap.createClient(response).then((client: Client) => {
        this.client = client;
        this.client.operation(remote_function, data).then(operation => {
          this.http.post('https://www.usa2georgia.com/shipping_new/public/ws/client.php?wsdl', operation.xml, {responseType:'text' })
            .subscribe(response => {
              this.getCartuDescriptorMessage.next({ message: JSON.parse(this.client.parseResponseBody(response).Body.getCartuDescriptorResponse.json.$value)});
            })
        });
      });
    });
    return this.getCartuDescriptorMessage.asObservable();
  }

  pay(data){
    return this.http.post('https://e-commerce.cartubank.ge/servlet/Process3DSServlet/3dsproxy_init.jsp', data, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}, responseType: 'text'});
  }

}
