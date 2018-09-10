import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import {Client, SOAPService} from "ngx-soap";
import {Subject} from "rxjs/Subject";
import {CONFIG} from "../../config";

@Injectable()
export class RegistrationService {
  private client: Client;
  private registerMessage = new Subject<any>();
  constructor(private http: HttpClient,
              private soap: SOAPService){

  }

  register(remote_function, data) {
    this.http.get('./assets/soap.wsdl',{responseType:"text"}).subscribe(response => {
      this.soap.createClient(response).then((client: Client) => {
        this.client = client;
        this.client.operation(remote_function, data).then(operation => {
          this.http.post(CONFIG.url, operation.xml, {responseType:'text' })
            .subscribe(response => {
              this.registerMessage.next({ message: JSON.parse(this.client.parseResponseBody(response).Body.registerResponse.json.$value)});
            })
        });
      });
    });
    return this.registerMessage.asObservable();
  }
}
