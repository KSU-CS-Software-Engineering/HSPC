import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';
import { WebsocketService } from './websocket.service';

const CHAT_URL = 'wss://echo.websocket.org/';

export interface Message {
  author: string;
  message: string;
}

@Injectable()
export class ChatService {
  public messages: Subject<Message>;

  constructor(wsService: WebsocketService) {
    this.messages = <Subject<Message>>wsService
      .connect(CHAT_URL)
      .map((response: MessageEvent): Message => {
        const data = JSON.parse(response.data);
        return {
          author: data.author,
          message: data.message
        };
      });
  }
}
