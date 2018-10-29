import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { WebsocketService } from '../_services/websocket.service';
import { ChatService } from '../_services/chat.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private titleService: Title) {
    /* chatService.messages.subscribe(msg => {
      console.log('Response from websocket: ' + msg);
    });*/
  }

  private message = {
    author: 'tutorialedge',
    message: 'this is a test message'
  };


  ngOnInit() {
    this.titleService.setTitle('Judgr - Home');

  }

  /*sendMsg() {
    console.log('new message from client to websocket: ', this.message);
    this.chatService.messages.next(this.message);
    this.message.message = '';
  }*/

}
