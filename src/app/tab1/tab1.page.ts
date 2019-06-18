import { Component } from '@angular/core';
import { FCM } from '@ionic-native/fcm/ngx';
import { Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  token: any;

  constructor(
    private fcm: FCM,
    private platform: Platform,
    private localNotifications: LocalNotifications,
    private http: HttpClient) {

    this.fcm.getToken().then(token => {
      this.token = token;
    });
    this.fcm.onNotification().subscribe(data => {
      if (data.wasTapped) {
        console.log('Received in background');
      } else {
        console.log('Received in foreground');
      }
    });
  }

  notifyMe() {
    console.log(this.token);
    // let headers = new Headers({ 'Authorization': 'key=KEY', 'Content-Type': 'application/json' });
    const header = {
      headers: {
        'Authorization': 'key = AAAA83hOtWA:APA91bHht2H9zv8LhFvoRJpGKTDxY7UT9KBJKMW1GfnjlmL_XiHPyWnOt-b1TMvwf-uwRFrTXWoshoyPNsNI3YmNJnQJex8UpCTFily7E5ns_5EipsCm8YDU78GcvWYOZsYykUDMfOhd',
        'Content-Type': 'application/json',
      }
    };
    // const options = new RequestOptions({ headers: header });
    const notification = {
      notification: {
        title: 'Hello',
        body: 'Welcome to Test Push Notification',
        click_action: 'FCM_PLUGIN_ACTIVITY',
        sound: 'default'
      },
      data: {
        custom_notification: {
          title: 'Hello', body: 'Welcome to Test Push Notification', show_in_foreground: true
        }
      },
      to: this.token,
      priority: 'high',
      show_in_foreground: true
    };

    const url = 'https://fcm.googleapis.com/fcm/send';
    this.http.post(url, notification, header).subscribe(res => {
      console.log(res);
      this.localNotifications.schedule({
        id: 1,
        title: 'Hello',
        text: 'Welcome to Test Push Notification',
      });
    });
  }
}
