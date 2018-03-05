import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import {Client, SOAPService} from "ngx-soap";
import {Subject} from "rxjs/Subject";

@Injectable()
export class PendingService {
  private client: Client;
  private getPendingMessage = new Subject<any>();
  private hawbMessage = new Subject<any>();
  constructor(private http: HttpClient,
              private soap: SOAPService){}

  getPending(remote_function, data): Observable<any> {
    this.http.get('./assets/soap.wsdl',{responseType:"text"}).subscribe(response => {
      this.soap.createClient(response).then((client: Client) => {
        this.client = client;
        this.client.operation(remote_function, data).then(operation => {
          this.http.post('https://www.usa2georgia.com/shipping_new/public/ws/client.php?wsdl', operation.xml, {responseType:'text' })
            .subscribe(response => {
              this.getPendingMessage.next({ message: JSON.parse(this.client.parseResponseBody(response).Body.getPendingResponse.json.$value)});
            })
        });
      });
    });
    return this.getPendingMessage.asObservable();
  }

  changeHawbBranch(remote_function, data) {
    this.http.get('./assets/soap.wsdl',{responseType:"text"}).subscribe(response => {
      this.soap.createClient(response).then((client: Client) => {
        this.client = client;
        this.client.operation(remote_function, data).then(operation => {
          this.http.post('https://www.usa2georgia.com/shipping_new/public/ws/client.php?wsdl', operation.xml, {responseType:'text' })
            .subscribe(response => {
              this.hawbMessage.next({ message: JSON.parse(this.client.parseResponseBody(response).Body.changeHawbBranchResponse.json.$value)});
            })
        });
      });
    });
    return this.hawbMessage.asObservable();
  }
}
