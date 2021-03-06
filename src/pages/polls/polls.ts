import { Component } from '@angular/core';

import { NavController, ModalController } from 'ionic-angular';

import { UserData } from '../../providers/user-data';
import { PollsData } from '../../providers/polls';
import { LoginPage }  from "../login/login";

@Component({
  selector: 'polls',
  templateUrl: 'polls.html'
})
export class PollsPage {
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

  constructor(public nav: NavController,
              public pollsData: PollsData,
              public user: UserData,
              public modalCtrl: ModalController) {

  }

  ionViewDidLoad() {

    this.user.getUsername().then((email) => {

      this.pollsData.getPolls().subscribe((polls: any[]) => {
        this.updatePolls(email, polls);
      });


    });
  }

  updatePolls(email: any, polls: any) {
    if(!polls || (polls && typeof polls.map !== "function")) {
      return;
    }

    this.polls = polls.map((poll: any) => {

      let userVote = poll.users.find((user: any) => {
        return user.email === email;
      });

      poll.userVoted = !!userVote;

      if (poll.userVoted) {
        poll.userVote = +userVote.vote;
      }

      let results: any = this.getVoteResults(poll);

      let total = results.reduce((a: any, b: any) => {
        return a + (b.value * b.key);
      }, 0);

      poll.totalVoteCount = total;

      poll.averagePercentage = (poll.totalVoteCount / (poll.users.length * 3)) * 100;

      poll.commentsCount = this.getCommentsCount(poll);

      return poll;
    });
  }

  setVote(vote: any, poll: any) {
    if (!poll.userVoted) {
      poll.userVote = vote.value;
      poll.userVoteTitle = vote.title;
    }
  }

  vote(poll: any) {
    this.user.getUsername().then((email) => {
      if (email) {
        let voteReq = {
          "email": email,
          "id": poll._id,
          "vote": poll.userVote,
          "comment": poll.comment
        };
        console.log(voteReq);

        this.pollsData.setVote(voteReq)
          .subscribe((data) => {
            this.updatePolls(email, data.pools);
          });
      } else {
        this.nav.push(LoginPage);
      }

    });
  }

  getVoteResults(poll: any) {
    let results: any = {0: 0, 1: 0, 2: 0, 3: 0};
    poll.users
      .forEach((result: any) => {
        results[result.vote]++;
      });

    return Object.keys(results).map((item) => {
      return {
        key: item,
        value: results[item]
      }
    });
  }

  getVoteResultsMaxValue(poll: any) {
    let results = this.getVoteResults(poll);
    let max: number = 0;

    results.forEach((item) => {
      if (item.value > max){
        max = item.value;
      }
    });

    return max;
  }

  getUserPlace(userVote: any) {
    return userVote * (100/3);
  }

  getCommentsCount(poll: any) {
    let count = 0;

    poll.users.forEach((item: any) => {
      if (item.comment){
        count++;
      }
    });

    return count;
  }

}
