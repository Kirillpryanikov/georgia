import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { Client, SOAPService } from "ngx-soap";
import { Subject } from "rxjs/Subject";
import {CONFIG} from "../../config";

@Injectable()
export class ReceivedService {
  private client: Client;
  private getReceivedMessage = new Subject<any>();
  private getReceivedPartialMessage = new Subject<any>();
  constructor(private http: HttpClient,
              private soap: SOAPService){}

  getReceived(remote_function, data): Observable<any> {
    this.http.get('./assets/soap.wsdl',{responseType:"text"}).subscribe(response => {
      this.soap.createClient(response).then((client: Client) => {
        this.client = client;
        this.client.operation(remote_function, data).then(operation => {
          this.http.post(CONFIG.url, operation.xml, {responseType:'text' })
            .subscribe(response => {
              this.getReceivedMessage.next({ message: JSON.parse(this.client.parseResponseBody(response).Body.getReceivedResponse.json.$value)});
            })
        });
      });
    });
    return this.getReceivedMessage.asObservable();
  }

  getReceivedPartial(remote_function, data): Observable<any> {
    this.http.get('./assets/soap.wsdl',{responseType:"text"}).subscribe(response => {
      this.soap.createClient(response).then((client: Client) => {
        this.client = client;
        this.client.operation(remote_function, data).then(operation => {
          this.http.post(CONFIG.url, operation.xml, {responseType:'text' })
            .subscribe(response => {
              this.getReceivedPartialMessage.next({ message: JSON.parse(this.client.parseResponseBody(response).Body.getReceivedPartialResponse.json.$value)});
            })
        });
      });
    });
    return this.getReceivedPartialMessage.asObservable();
  }
}
