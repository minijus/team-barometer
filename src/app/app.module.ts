import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {NgModule, ErrorHandler} from '@angular/core';

import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';

import {InAppBrowser} from '@ionic-native/in-app-browser';
import {SplashScreen} from '@ionic-native/splash-screen';

import {IonicStorageModule} from '@ionic/storage';

import {ConferenceApp} from './app.component';

import {PollsPage} from '../pages/polls/polls';
import {AboutPage} from '../pages/about/about';
import {AccountPage} from '../pages/account/account';
import {LoginPage} from '../pages/login/login';
import {SchedulePage} from '../pages/schedule/schedule';
import {SignupPage} from '../pages/signup/signup';
import {TutorialPage} from '../pages/tutorial/tutorial';

import {PollsData} from '../providers/polls';
import {UserData} from '../providers/user-data';


@NgModule({
  declarations: [
    ConferenceApp,
    PollsPage,
    AboutPage,
    AccountPage,
    LoginPage,
    SchedulePage,
    SignupPage,
    TutorialPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(ConferenceApp, {}, {
      links: [
        {component: SchedulePage, name: 'Schedule', segment: 'schedule'},
        {component: PollsPage, name: 'PollsPage', segment: 'polls'},
        {component: AboutPage, name: 'AboutPage', segment: 'about'},
        {component: TutorialPage, name: 'Tutorial', segment: 'tutorial'},
        {component: LoginPage, name: 'LoginPage', segment: 'login'},
        {component: AccountPage, name: 'AccountPage', segment: 'account'},
        {component: SignupPage, name: 'SignupPage', segment: 'signup'}
      ]
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ConferenceApp,
    PollsPage,
    AboutPage,
    AccountPage,
    LoginPage,
    SchedulePage,
    SignupPage,
    TutorialPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PollsData,
    UserData,
    InAppBrowser,
    SplashScreen
  ]
})
export class AppModule {
}
