import {Component} from '@angular/core';

import {PollsData} from '../../providers/polls';
import {ToastController} from "ionic-angular";

@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html'
})
export class SchedulePage {

  pollTitle: string = "";
  theme: string = "default";

  constructor(public pollsData: PollsData,
              public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {

  }

  onAdd() {
    if (this.pollTitle !== "" && this.theme !== "") {
      let reqData = {
        poolTitle: this.pollTitle,
        theme: this.theme,
        "options": [{
          "value": "0",
          "title": "Bad",
          "name": "bad"
        },
          {
            "value": "1",
            "title": "Neutral",
            "name": "neutral"
          },
          {
            "value": "2",
            "title": "Good",
            "name": "good"
          },
          {
            "value": "3",
            "title": "Wow",
            "name": "wow"
          }
        ]

      };

      this.pollsData.addPoll(reqData).subscribe((res) => {
        this.presentToast();
      });
      this.clearInput();
    }
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Poll was added successfully',
      duration: 3000
    });
    toast.present();
  }

  clearInput() {
    this.pollTitle = "";
    this.theme = "default";
  }
}
