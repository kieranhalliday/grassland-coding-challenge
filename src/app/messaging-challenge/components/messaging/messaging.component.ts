import { Component } from '@angular/core';
import { MessagingService } from '../../services/messaging.service';
import { TextMessage } from '../../models/text-message';
import { ImageMessage } from '../../models/image-message';
import { Message } from '../../models/message';

@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.scss']
})
export class MessagingComponent {
  messages$ = this.messagingService.messages$;

  constructor(public messagingService: MessagingService) {
  }

  /**
   * Type guard to check if the message is a TextMessage.
   * @param message - The message object to check.
   * @returns True if the message is a TextMessage, false otherwise.
   */
  isTextMessage(message: Message): message is TextMessage {
    return message instanceof TextMessage;
  }

  /**
   * Type guard to check if the message is an ImageMessage.
   * @param message - The message object to check.
   * @returns True if the message is an ImageMessage, false otherwise.
   */
  isImageMessage(message: Message): message is ImageMessage {
    return message instanceof ImageMessage;
  }

}
