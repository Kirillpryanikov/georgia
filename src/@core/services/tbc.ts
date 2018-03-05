import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import {Client, SOAPService} from "ngx-soap";
import {Subject} from "rxjs/Subject";

@Injectable()
export class TbcService {
  private client: Client;
  private generateTBCBankTransactionMessage = new Subject<any>();
  constructor(private http: HttpClient,
              private soap: SOAPService){}

  generateTBCBankTransaction(remote_function, data) {
    this.http.get('./assets/soap.wsdl',{responseType:"text"}).subscribe(response => {
      this.soap.createClient(response).then((client: Client) => {
        this.client = client;
        this.client.operation(remote_function, data).then(operation => {
          this.http.post('https://www.usa2georgia.com/shipping_new/public/ws/client.php?wsdl', operation.xml, {responseType:'text' })
            .subscribe(response => {
              this.generateTBCBankTransactionMessage.next({ message: JSON.parse(this.client.parseResponseBody(response).Body.generateTBCBankTransactionResponse.json.$value)});
            })
        });
      });
    });
    return this.generateTBCBankTransactionMessage.asObservable();
  }

  pay(data){
    return this.http.post('https://securepay.ufc.ge/ecomm2/ClientHandler', data);
  }
}
