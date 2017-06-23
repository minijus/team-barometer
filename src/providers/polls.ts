import { Injectable } from '@angular/core';

import { Http, RequestOptions, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';


@Injectable()
export class PollsData {
  data: any;

  constructor(public http: Http) { }

  load(): any {
    if (this.data) {
      return Observable.of(this.data);
    } else {
      return this.http.get('https://pacific-garden-31653.herokuapp.com/group/pools')
        .map(this.processData, this);
    }
  }

  processData(data: any) {
    this.data = data.json();

    console.log(this.data);

    return this.data;
  }

  getPolls() {
    return this.load().map((data: any) => {
      return data;
    });
  }

  setVote(voteReq: any) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post("https://pacific-garden-31653.herokuapp.com/group/vote", voteReq, options)
      .map(this.processData, this);
  }

  addPoll(polReq: any){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post("https://pacific-garden-31653.herokuapp.com/group/add", polReq, options)
      .map(this.processData, this);
  }

}
