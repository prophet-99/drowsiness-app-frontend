import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { Client, Message } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StatisticsWebSocketService {
  private baseUrl = environment.API_BASE_URL;
  private stompClient: Client;
  private notificationSubject: Subject<string> = new Subject<string>();
  public notification$: Observable<string> =
    this.notificationSubject.asObservable();

  constructor() {
    this.stompClient = new Client({
      webSocketFactory: () => new SockJS(`${this.baseUrl}/ws`),
    });
  }

  public connect(): void {
    this.stompClient.activate();
    this.stompClient.onConnect = () => {
      this.stompClient.subscribe(`/topic/statistics`, (message: Message) =>
        this.notificationSubject.next(message.body)
      );
    };
  }

  public disconnect(): void {
    if (this.stompClient && this.stompClient.active) {
      this.stompClient.deactivate();
    }
  }
}
