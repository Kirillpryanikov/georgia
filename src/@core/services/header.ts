import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import {Client, SOAPService} from "ngx-soap";
import {Subject} from "rxjs/Subject";

@Injectable()
export class HeaderService {
  private client: Client;
  private getNotificationMessage = new Subject<any>();
  private getInfoMessage = new Subject<any>();
  private changeLanguageMessage = new Subject<any>();
  constructor(private http: HttpClient,
              private soap: SOAPService){}

  getNotifications(remote_function, data): Observable<any> {
    this.http.get('./assets/soap.wsdl',{responseType:"text"}).subscribe(response => {
      this.soap.createClient(response).then((client: Client) => {
        this.client = client;
        this.client.operation(remote_function, data).then(operation => {
          this.http.post('https://www.usa2georgia.com/shipping_new/public/ws/client.php?wsdl', operation.xml, {responseType:'text' })
            .subscribe(response => {
              this.getNotificationMessage.next({ message: JSON.parse(this.client.parseResponseBody(response).Body.getNotificationsResponse.json.$value)});
            })
        });
      });
    });
    return this.getNotificationMessage.asObservable();
  }

  getInfo(remote_function, data): Observable<any> {
    this.http.get('./assets/soap.wsdl',{responseType:"text"}).subscribe(response => {
      this.soap.createClient(response).then((client: Client) => {
        this.client = client;
        this.client.operation(remote_function, data).then(operation => {
          this.http.post('https://www.usa2georgia.com/shipping_new/public/ws/client.php?wsdl', operation.xml, {responseType:'text' })
            .subscribe(response => {
              this.getInfoMessage.next({ message: JSON.parse(this.client.parseResponseBody(response).Body.getInfoResponse.json.$value)});
            })
        });
      });
    });
    return this.getInfoMessage.asObservable();
  }

  changeLanguage(remote_function, data): Observable<any> {
    this.http.get('./assets/soap.wsdl',{responseType:"text"}).subscribe(response => {
      this.soap.createClient(response).then((client: Client) => {
        this.client = client;
        this.client.operation(remote_function, data).then(operation => {
          this.http.post('https://www.usa2georgia.com/shipping_new/public/ws/client.php?wsdl', operation.xml, {responseType:'text' })
            .subscribe(response => {
              this.changeLanguageMessage.next({ message: JSON.parse(this.client.parseResponseBody(response).Body.changeLanguageResponse.json.$value)});
            })
        });
      });
    });
    return this.changeLanguageMessage.asObservable();
  }

}
