import {Component} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';

import {ScriptMainService} from "@core/script.data/script.main.service";
import {CommentPopups} from "@shared/popups/comment-popup-component/comment-popups";
import {ReceivedService} from "@core/services";

import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import {debounceTime} from 'rxjs/operators';

/**
 * Generated class for the ReceivedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name:'received-page'
})
@Component({
  selector: 'page-received',
  templateUrl: 'received.html',
})
export class ReceivedPage {
  private sessionId: string = '707d235b00280e693eab0496acb2690d';
  private listReceived: Array<any> = [];
  private subject = new Subject<any>();
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private mainService: ScriptMainService,
              private modalController: ModalController,
              private receivedService: ReceivedService) {
  }

  ionViewWillEnter() {
    this.getReceived().pipe(debounceTime(0)).subscribe(() => {
      this.initMasonry();
    })
  }

  initMasonry() {
    this.mainService.initMasonry();
  }

  invoice(e, index) {
    e.preventDefault();
    this.navCtrl.push('invoice-page',{invoice: this.listReceived[index].invoice});
  }

  showCommentPopup(index, _index) {
    const modal = this.modalController.create(CommentPopups, {package_id: this.listReceived[index].trackings[_index].package_id});
    modal.present();
  }

  getReceived(): Observable<any> {
    this.receivedService.getReceived('getReceived', {sessionId: this.sessionId}).subscribe(data => {
      console.log(data);
      this.listReceived = data.message.received;
      for(let i in this.listReceived){
        let weight_kg = 0;
        let weight_lbs = 0;
        for(let j in this.listReceived[i].trackings){
          weight_kg+=parseFloat(this.listReceived[i].trackings[j].weight_kg);
          weight_lbs+=parseFloat(this.listReceived[i].trackings[j].weight_lbs);
        }
        this.listReceived[i].weight_kg = Math.round(weight_kg * 10) / 10;
        this.listReceived[i].weight_lbs = Math.round(weight_lbs * 10) / 10;
      }
      this.subject.next();
    });
    return this.subject.asObservable();
  }
}
