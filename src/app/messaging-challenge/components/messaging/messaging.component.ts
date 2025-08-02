import { Component } from '@angular/core';
import { MessagingService } from '../../services/messaging.service';

@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.scss']
})
export class MessagingComponent {
  messages$ = this.messagingService.messages$;
  
  constructor(public messagingService: MessagingService) {
  }
}
