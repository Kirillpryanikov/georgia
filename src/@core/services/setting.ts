import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import {Client, SOAPService} from "ngx-soap";
import {Subject} from "rxjs/Subject";

@Injectable()
export class SettingService {
  private client: Client;
  private getCustomerSettingsMessage = new Subject<any>();
  private changeCustomerSettingsMessage = new Subject<any>();
  private getStreetsMessage = new Subject<any>();
  private uploadAvatarMessage = new Subject<any>();
  private removeAvatarMessage = new Subject<any>();
  private getAvatarMessage = new Subject<any>()

  constructor(private http: HttpClient,
              private soap: SOAPService){}

  getCustomerSettings(remote_function, data): Observable<any> {
    this.http.get('https://www.usa2georgia.com/shipping_new/public/ws/client.php?wsdl',{responseType:"text"}).subscribe(response => {
      this.soap.createClient(response).then((client: Client) => {
        this.client = client;
        this.client.operation(remote_function, data).then(operation => {
          this.http.post('https://www.usa2georgia.com/shipping_new/public/ws/client.php?wsdl', operation.xml, {responseType:'text' })
            .subscribe(response => {
              this.getCustomerSettingsMessage.next({ message: JSON.parse(this.client.parseResponseBody(response).Body.getCustomerSettingsResponse.json.$value)});
            })
        });
      });
    });
    return this.getCustomerSettingsMessage.asObservable();
  }

  changeCustomerSettings(remote_function, data): Observable<any> {
    this.http.get('https://www.usa2georgia.com/shipping_new/public/ws/client.php?wsdl',{responseType:"text"}).subscribe(response => {
      this.soap.createClient(response).then((client: Client) => {
        this.client = client;
        this.client.operation(remote_function, data).then(operation => {
          this.http.post('https://www.usa2georgia.com/shipping_new/public/ws/client.php?wsdl', operation.xml, {responseType:'text' })
            .subscribe(response => {
              this.changeCustomerSettingsMessage.next({ message: JSON.parse(this.client.parseResponseBody(response).Body.changeCustomerSettingsResponse.json.$value)});
            })
        });
      });
    });
    return this.changeCustomerSettingsMessage.asObservable();
  }

  getStreets(remote_function, data): Observable<any> {
    this.http.get('https://www.usa2georgia.com/shipping_new/public/ws/client.php?wsdl',{responseType:"text"}).subscribe(response => {
      this.soap.createClient(response).then((client: Client) => {
        this.client = client;
        this.client.operation(remote_function, data).then(operation => {
          this.http.post('https://www.usa2georgia.com/shipping_new/public/ws/client.php?wsdl', operation.xml, {responseType:'text' })
            .subscribe(response => {
              this.getStreetsMessage.next({ message: JSON.parse(this.client.parseResponseBody(response).Body.getStreetsResponse.json.$value)});
            })
        });
      });
    });
    return this.getStreetsMessage.asObservable();
  }

  uploadAvatar(remote_function, data): Observable<any> {
    this.http.get('https://www.usa2georgia.com/shipping_new/public/ws/client.php?wsdl',{responseType:"text"}).subscribe(response => {
      this.soap.createClient(response).then((client: Client) => {
        this.client = client;
        this.client.operation(remote_function, data).then(operation => {
          this.http.post('https://www.usa2georgia.com/shipping_new/public/ws/client.php?wsdl', operation.xml, {responseType:'text' })
            .subscribe(response => {
              this.uploadAvatarMessage.next({ message: JSON.parse(this.client.parseResponseBody(response).Body.uploadAvatarResponse.json.$value)});
            })
        });
      });
    });
    return this.uploadAvatarMessage.asObservable();
  }

  removeAvatar(remote_function, data): Observable<any> {
    this.http.get('https://www.usa2georgia.com/shipping_new/public/ws/client.php?wsdl',{responseType:"text"}).subscribe(response => {
      this.soap.createClient(response).then((client: Client) => {
        this.client = client;
        this.client.operation(remote_function, data).then(operation => {
          this.http.post('https://www.usa2georgia.com/shipping_new/public/ws/client.php?wsdl', operation.xml, {responseType:'text' })
            .subscribe(response => {
              this.removeAvatarMessage.next({ message: JSON.parse(this.client.parseResponseBody(response).Body.removeAvatarResponse.json.$value)});
            })
        });
      });
    });
    return this.removeAvatarMessage.asObservable();
  }

  getAvatar(remote_function, data): Observable<any> {
    this.http.get('https://www.usa2georgia.com/shipping_new/public/ws/client.php?wsdl',{responseType:"text"}).subscribe(response => {
      this.soap.createClient(response).then((client: Client) => {
        this.client = client;
        this.client.operation(remote_function, data).then(operation => {
          this.http.post('https://www.usa2georgia.com/shipping_new/public/ws/client.php?wsdl', operation.xml, {responseType:'text' })
            .subscribe(response => {
              this.getAvatarMessage.next({ message: JSON.parse(this.client.parseResponseBody(response).Body.getAvatarResponse.json.$value)});
            })
        });
      });
    });
    return this.getAvatarMessage.asObservable();
  }
}
