import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from "rxjs/Subject";
import { SOAPService, Client } from "ngx-soap";
import { Observable } from "rxjs/Observable";

@Injectable()
export class AwaitingTrackingService {
  private client: Client;
  private getAwaitingMessage = new Subject<any>();
  private addTrackingMessage = new Subject<any>();
  private removeTrackingMessage = new Subject<any>();
  private changePackageMessage = new Subject<any>();

  constructor(private http: HttpClient,
              private soap: SOAPService){

  }

  getAwaiting(remote_function, data): Observable<any> {
    this.http.get('/assets/soap.wsdl',{responseType:"text"}).subscribe(response => {
      this.soap.createClient(response).then((client: Client) => {
        this.client = client;
        this.client.operation(remote_function, data).then(operation => {
          this.http.post('https://www.usa2georgia.com/shipping_new/public/ws/client.php?wsdl', operation.xml, {responseType:'text' })
            .subscribe(response => {
              this.getAwaitingMessage.next({ message: JSON.parse(this.client.parseResponseBody(response).Body.getAwaitingResponse.json.$value)});
            })
        });
      });
    });
    return this.getAwaitingMessage.asObservable();
  }

  addTracking(remote_function, data): Observable<any> {
    this.http.get('/assets/soap.wsdl',{responseType:"text"}).subscribe(response => {
      this.soap.createClient(response).then((client: Client) => {
        this.client = client;
        this.client.operation(remote_function, data).then(operation => {
          this.http.post('https://www.usa2georgia.com/shipping_new/public/ws/client.php?wsdl', operation.xml, {responseType:'text' })
            .subscribe(response => {
              this.addTrackingMessage.next({ message: JSON.parse(this.client.parseResponseBody(response).Body.addTrackingResponse.json.$value)});
            })
        });
      });
    });
    return this.addTrackingMessage.asObservable();
  }

  removeTracking(remote_function, data): Observable<any> {
    this.http.get('/assets/soap.wsdl',{responseType:"text"}).subscribe(response => {
      this.soap.createClient(response).then((client: Client) => {
        this.client = client;
        this.client.operation(remote_function, data).then(operation => {
          this.http.post('https://www.usa2georgia.com/shipping_new/public/ws/client.php?wsdl', operation.xml, {responseType:'text' })
            .subscribe(response => {
              this.removeTrackingMessage.next({ message: JSON.parse(this.client.parseResponseBody(response).Body.removeTrackingResponse.json.$value)});
            })
        });
      });
    });
    return this.removeTrackingMessage.asObservable();
  }

  changePackageSetting(remote_function, data): Observable<any> {
    this.http.get('/assets/soap.wsdl',{responseType:"text"}).subscribe(response => {
      this.soap.createClient(response).then((client: Client) => {
        this.client = client;
        this.client.operation(remote_function, data).then(operation => {
          this.http.post('https://www.usa2georgia.com/shipping_new/public/ws/client.php?wsdl', operation.xml, {responseType:'text' })
            .subscribe(response => {
              this.changePackageMessage.next({ message: JSON.parse(this.client.parseResponseBody(response).Body.changePackageSettingResponse.json.$value)});
            })
        });
      });
    });
    return this.changePackageMessage.asObservable();
  }
}
