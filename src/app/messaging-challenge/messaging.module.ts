import { NgModule } from '@angular/core';

import { TextMessageComponent } from './components/text-message/text-message.component';
import { ImageMessageComponent } from './components/image-message/image-message.component';
import { MessagingComponent } from './components/messaging/messaging.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    TextMessageComponent,
    ImageMessageComponent,
    MessagingComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    MessagingComponent
  ]
})
export class MessagingModule { }