import { Component, Input } from '@angular/core';
import { Message } from '../../models/message';

@Component({ template: '' })
export abstract class BaseMessageComponent {

  @Input() message: Message;

  /**
   * Check if the message is from Anna
   * @returns true if message is from Anna, false otherwise
   */
  isFromAnna(): boolean {
    return this.message?.from?.toLowerCase() === 'anna';
  }

}
