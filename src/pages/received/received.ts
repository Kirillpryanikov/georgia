import {Component, OnInit} from '@angular/core';
import {IonicPage, LoadingController, ModalController, NavController, NavParams} from 'ionic-angular';

import {ScriptMainService} from "@core/script.data/script.main.service";
import {CommentPopups} from "@shared/popups/comment-popup-component/comment-popups";
import {ReceivedService} from "@core/services";

import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import {debounceTime} from 'rxjs/operators';
import {NativeStorage} from "@ionic-native/native-storage";
import {TranslateService} from "@ngx-translate/core";
import {Subscription} from "rxjs/Subscription";


@IonicPage({
  name:'received-page'
})
@Component({
  selector: 'page-received',
  templateUrl: 'received.html',
})
export class ReceivedPage implements OnInit {
  public logoWrapper = '_RECEIVED';
  public active = 'received';
  private sessionId: string;
  private visible: boolean;
  private load;
  private from = 0;
  private temp: boolean = false;
  private count = 10;
  private data = {};
  private listReceived: Array<any> = [];
  private subscription: Subscription;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private mainService: ScriptMainService,
              private modalController: ModalController,
              private receivedService: ReceivedService,
              private loadingCtrl: LoadingController,
              private translate: TranslateService,
              private nativeStorage: NativeStorage) {
  }

  ngOnInit() {
    this.nativeStorage.getItem('sessionId')
      .then(res => {
        this.sessionId = res;
        this.getReceivedPartial(this.from);
      });
  }

  initMasonry() {
    this.mainService.initMasonry();
  }

  loadMore() {
    this.getReceivedPartial(this.from);
  }

  navTo(e, page) {
    e.preventDefault();
    if(this.navCtrl.getActive().id !== page)
      this.navCtrl.setRoot(page);
  }

  invoice(e, index) {
    e.preventDefault();
    this.navCtrl.push('invoice-page',{invoice: this.listReceived[index].invoice});
  }

  showCommentPopup(index, _index) {
    const modal = this.modalController.create(CommentPopups, {package_id: this.listReceived[index].trackings[_index].package_id});
    modal.present();
  }

  getReceivedPartial(from){
    this.load = this.loadingCtrl.create({
      spinner: 'dots'
    });
    this.load.present();
    this.data = {
      sessionId: this.sessionId,
      from: from,
      count: this.count
    };
    this.subscription = this.receivedService.getReceivedPartial('getReceivedPartial', this.data).subscribe(data => {
      if(data.message.received.length === 0){
        this.visible = false;
      }
      for(let i = 0; i < data.message.received.length; i++) {
        this.visible = true;
        this.temp = true;
        this.listReceived.push(data.message.received[i]);
      }
      this.subscription.unsubscribe();
    });
    this.load.dismiss();
    this.from = this.from + this.count;
  }
}
