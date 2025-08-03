import { Component, Input } from '@angular/core';
import { BaseMessageComponent } from '../base-message/base-message.component';
import { ImageMessage } from '../../models/image-message';

@Component({
    selector: 'app-image-message',
    templateUrl: './image-message.component.html',
    styleUrls: ['./image-message.component.scss']
}) export class ImageMessageComponent extends BaseMessageComponent {
    // Override the message property to be specifically ImageMessage type
    @Input()
    override message!: ImageMessage;
}