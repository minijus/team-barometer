import {Component} from '@angular/core';
import {NavController, NavParams, ViewController, ModalController} from 'ionic-angular';

@Component({
  selector: 'support',
  templateUrl: 'support.html'
})

export class SupportPage {

  users: any[];
  comments: any[];

  constructor(public navCtrl: NavController, public params: NavParams, public modalCtrl: ModalController, public viewController: ViewController) {
    this.users = params.get('users');

    this.comments = this.users
      .filter((item) => {
        if (item.comment) {
          return item;
        }
      })
      .map((item) => {
        return {
          name: item.email,
          comment: item.comment
        }
      });

    this.comments.forEach((item) => {
      console.log(item);
    })
  }

  ionViewDidLoad() {

  }

  dismiss() {
    this.viewController.dismiss(null);
  }

}
