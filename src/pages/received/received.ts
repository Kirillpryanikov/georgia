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
  private sessionId = '707d235b00280e693eab0496acb2690d';
  private listReceived = [];
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

  invoice(e) {
    e.preventDefault();
    this.navCtrl.push('invoice-page');
  }

  showCommentPopup(index, _index) {
    const modal = this.modalController.create(CommentPopups, {package_id: this.listReceived[index].trackings[_index].package_id});
    modal.present();
  }

  getReceived(): Observable<any> {
    this.receivedService.getReceived('getReceived', {sessionId: this.sessionId}).subscribe(data => {
      this.listReceived = data.message.received;
      this.subject.next();
    });
    return this.subject.asObservable();
  }
}

