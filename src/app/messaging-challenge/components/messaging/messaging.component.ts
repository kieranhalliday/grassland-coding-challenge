import { Component } from '@angular/core';
import { MessagingService } from '../../services/messaging.service';
import { TextMessage } from '../../models/text-message';

@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.scss']
})
export class MessagingComponent {
  messages$ = this.messagingService.messages$;

  constructor(public messagingService: MessagingService) {
  }

  isTextMessage(message: any): message is TextMessage {
    return message instanceof TextMessage ||
      (message && typeof message.content === 'string' &&
        !message.content.includes('assets/'));
  }
}
