import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import { Client, SOAPService } from "ngx-soap";
import {Subject} from "rxjs/Subject";

@Injectable()
export class PopupService {
  private client: Client;
  private getComment = new Subject<any>();
  private addComment = new Subject<any>();
  private uploadInvoiceComment = new Subject<any>();
  private getInfoMessage = new Subject<any>();
  private getUnpaidInvoicesMessage = new Subject<any>();
  constructor(private http: HttpClient,
              private soap: SOAPService){}

  /**
   *
   * @param data = { $sessionId:string, $packageId:integer, $key:string, $value:integer }
   * string	$sessionId     - Session identifier returned by login function
   * integer	$packageId   - Package identifier
   * string	$key           - Possible values: INSURANCE|CUT_DOWN|PUT_INTO_BAG
   * integer	$value       - Possible values: 0|1 ( 0 - Off, 1 - On )
   *
   * @returns {Observable<any>}
   */

  addTrackingComment(remote_function, data): Observable<any> {
    this.http.get('./assets/soap.wsdl',{responseType:"text"}).subscribe(response => {
      this.soap.createClient(response).then((client: Client) => {
        this.client = client;
        this.client.operation(remote_function, data).then(operation => {
          this.http.post('https://www.usa2georgia.com/shipping_new/public/ws/client.php?wsdl', operation.xml, {responseType:'text' })
            .subscribe(response => {
              this.addComment.next({ message: JSON.parse(this.client.parseResponseBody(response).Body.addTrackingCommentResponse.json.$value)});
            })
        });
      });
    });
    return this.addComment.asObservable();
  }

  getTrackingComment(remote_function, data): Observable<any> {
    this.http.get('./assets/soap.wsdl',{responseType:"text"}).subscribe(response => {
      this.soap.createClient(response).then((client: Client) => {
        this.client = client;
        this.client.operation(remote_function, data).then(operation => {
          this.http.post('https://www.usa2georgia.com/shipping_new/public/ws/client.php?wsdl', operation.xml, {responseType:'text' })
            .subscribe(response => {
              this.getComment.next({ message: JSON.parse(this.client.parseResponseBody(response).Body.getTrackingCommentResponse.json.$value)});
            })
        });
      });
    });
    return this.getComment.asObservable();
  }

  uploadInvoice(remote_function, data): Observable<any> {
    this.http.get('./assets/soap.wsdl',{responseType:"text"}).subscribe(response => {
      this.soap.createClient(response).then((client: Client) => {
        this.client = client;
        this.client.operation(remote_function, data).then(operation => {
          this.http.post('https://www.usa2georgia.com/shipping_new/public/ws/client.php?wsdl', operation.xml, {responseType:'text' })
            .subscribe(response => {
              this.uploadInvoiceComment.next({ message: JSON.parse(this.client.parseResponseBody(response).Body.uploadInvoiceResponse.json.$value)});
            })
        });
      });
    });
    return this.uploadInvoiceComment.asObservable();
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

  getUnpaidInvoices(remote_function, data): Observable<any> {
    this.http.get('./assets/soap.wsdl',{responseType:"text"}).subscribe(response => {
      this.soap.createClient(response).then((client: Client) => {
        this.client = client;
        this.client.operation(remote_function, data).then(operation => {
          this.http.post('https://www.usa2georgia.com/shipping_new/public/ws/client.php?wsdl', operation.xml, {responseType:'text' })
            .subscribe(response => {
              this.getUnpaidInvoicesMessage.next({ message: JSON.parse(this.client.parseResponseBody(response).Body.getUnpaidInvoicesResponse.json.$value)});
            })
        });
      });
    });
    return this.getUnpaidInvoicesMessage.asObservable();
  }
}
