import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
// import { InAppBrowser } from '@ionic-native/in-app-browser';

import { UserData } from '../../providers/user-data';
import { PollsData } from '../../providers/polls';

// import { SessionDetailPage } from '../session-detail/session-detail';
// import { SpeakerDetailPage } from '../speaker-detail/speaker-detail';

@Component({
  selector: 'polls',
  templateUrl: 'polls.html'
})
export class PollsPage {
  // actionSheet: ActionSheet;
  polls: any[] = [];
  votes: any[] = [{
    value: 0,
    name: "bad"
  }, {
    value: 1,
    name: "neutral"
  }, {
    value: 2,
    name: "good"
  }, {
    value: 3,
    name: "wow"
  }];

  // constructor(
  //   public actionSheetCtrl: ActionSheetController,
  //   public navCtrl: NavController,
  //   public confData: ConferenceData,
  //   public config: Config,
  //   public inAppBrowser: InAppBrowser
  // ) { }


  constructor(
    public nav: NavController,
    public pollsData: PollsData,
    public user: UserData,) {

  }

  ionViewDidLoad() {
    this.pollsData.getPolls().subscribe((polls: any[]) => {
      this.polls = polls;
    });
  }

  goToPollDetail(poll: any) {
    console.log(poll);
    // this.navCtrl.push(PollDetailPage, {
    //   name: poll.title,
    //   poll: poll
    // });
  }

  setVote(vote: any, poll: any){
    console.log(vote, poll);
    poll.userVote = vote.value;
  }

  vote(poll: any) {
    this.user.getUsername().then((email) => {
      let voteReq = {
        "email": email,
        "id": poll._id,
        "vote": poll.userVote,
        "comment": ""
      };
      console.log(voteReq);

      this.pollsData.setVote(voteReq)
        .subscribe((data) => {
          console.log(data);
        });
    });
  }

  _getCommentsCount(poll: any){
    return poll.users.reduce((a: any, b: any) => {
      if (!b.comment){
        return 0;
      }
      return a + 1;
    }, 0);

  }

  // goToSpeakerDetail(speakerName: any) {
  //   this.navCtrl.push(SpeakerDetailPage, {
  //     speaker: speakerName,
  //     name: speakerName.name
  //   });
  // }

  // goToSpeakerTwitter(speaker: any) {
  //   this.inAppBrowser.create(`https://twitter.com/${speaker.twitter}`, '_blank');
  // }

  // openSpeakerShare(speaker: any) {
  //   let actionSheet = this.actionSheetCtrl.create({
  //     title: 'Share ' + speaker.name,
  //     buttons: [
  //       {
  //         text: 'Copy Link',
  //         handler: () => {
  //           console.log('Copy link clicked on https://twitter.com/' + speaker.twitter);
  //           if ((window as any)['cordova'] && (window as any)['cordova'].plugins.clipboard) {
  //             (window as any)['cordova'].plugins.clipboard.copy('https://twitter.com/' + speaker.twitter);
  //           }
  //         }
  //       },
  //       {
  //         text: 'Share via ...'
  //       },
  //       {
  //         text: 'Cancel',
  //         role: 'cancel'
  //       }
  //     ]
  //   });
  //
  //   actionSheet.present();
  // }

  // openContact(speaker: any) {
  //   let mode = this.config.get('mode');
  //
  //   let actionSheet = this.actionSheetCtrl.create({
  //     title: 'Contact ' + speaker.name,
  //     buttons: [
  //       {
  //         text: `Email ( ${speaker.email} )`,
  //         icon: mode !== 'ios' ? 'mail' : null,
  //         handler: () => {
  //           window.open('mailto:' + speaker.email);
  //         }
  //       },
  //       {
  //         text: `Call ( ${speaker.phone} )`,
  //         icon: mode !== 'ios' ? 'call' : null,
  //         handler: () => {
  //           window.open('tel:' + speaker.phone);
  //         }
  //       }
  //     ]
  //   });
  //
  //   actionSheet.present();
  // }
}
