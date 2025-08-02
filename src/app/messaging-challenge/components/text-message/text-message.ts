import { Component, Input } from '@angular/core';
import { BaseMessageComponent } from '../base-message/base-message.component';
import { TextMessage } from '../../models/text-message';

@Component({
    selector: 'app-text-message',
    templateUrl: './text-message.html',
    styleUrls: ['./text-message.scss']
}) export class TextMessageComponent extends BaseMessageComponent {
    // Override the message property to be specifically TextMessage type
    @Input()
    override message!: TextMessage;

    /**
     * Check if the message is from Anna
     * @returns true if message is from Anna, false otherwise
     */
    isFromAnna(): boolean {
        return this.message?.from?.toLowerCase() === 'anna';
    }
}