import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import { Client, SOAPService} from "ngx-soap";
import { Subject } from "rxjs/Subject";

@Injectable()
export class UsaWarehouseService {
  private client: Client;
  private getUsaWarehouseMessage = new Subject<any>();
  constructor(private http: HttpClient,
              private soap: SOAPService){

  }

  getUsaWarehouse(remote_function, data): Observable<any> {
    this.http.get('/assets/soap.wsdl',{responseType:"text"}).subscribe(response => {
      this.soap.createClient(response).then((client: Client) => {
        this.client = client;
        this.client.operation(remote_function, data).then(operation => {
          this.http.post('https://www.usa2georgia.com/shipping_new/public/ws/client.php?wsdl', operation.xml, {responseType:'text' })
            .subscribe(response => {
              this.getUsaWarehouseMessage.next({ message: JSON.parse(this.client.parseResponseBody(response).Body.getUsaWarehouseResponse.json.$value)});
            })
        });
      });
    });
    return this.getUsaWarehouseMessage.asObservable();
  }
}
