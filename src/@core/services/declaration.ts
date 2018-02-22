import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import {SOAPService, Client} from "ngx-soap";
import {Subject} from "rxjs/Subject";

@Injectable()
export class DeclarationService {
  private client: Client;
  private getDeclarationMessage = new Subject<any>();
  private declareTrackingMessage = new Subject<any>();
  constructor(private http: HttpClient,
              private soap: SOAPService){

  }

  getDeclaration(remote_function, data): Observable<any> {
    this.http.get('https://www.usa2georgia.com/shipping_new/public/ws/client.php?wsdl',{responseType:"text"}).subscribe(response => {
      this.soap.createClient(response).then((client: Client) => {
        this.client = client;
        this.client.operation(remote_function, data).then(operation => {
          this.http.post('https://www.usa2georgia.com/shipping_new/public/ws/client.php?wsdl', operation.xml, {responseType:'text' })
            .subscribe(response => {
              this.getDeclarationMessage.next({ message: JSON.parse(this.client.parseResponseBody(response).Body.getDeclarationResponse.json.$value)});
            })
        });
      });
    });
    return this.getDeclarationMessage.asObservable();
  }

  declareTracking(remote_function, data) {
    this.http.get('https://www.usa2georgia.com/shipping_new/public/ws/client.php?wsdl',{responseType:"text"}).subscribe(response => {
      this.soap.createClient(response).then((client: Client) => {
        this.client = client;
        this.client.operation(remote_function, data).then(operation => {
          this.http.post('https://www.usa2georgia.com/shipping_new/public/ws/client.php?wsdl', operation.xml, {responseType:'text' })
            .subscribe(response => {
              this.declareTrackingMessage.next({ message: JSON.parse(this.client.parseResponseBody(response).Body.declareTrackingResponse.json.$value)});
            })
        });
      });
    });
    return this.declareTrackingMessage.asObservable();
  }
}
