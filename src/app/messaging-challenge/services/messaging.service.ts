import { Injectable } from '@angular/core';
import { concatMap, delay, from, of, scan } from 'rxjs';
import { TextMessage } from '../models/text-message';
import { ImageMessage } from '../models/image-message';
import { Message } from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  public readonly messages$ = from([
    new TextMessage('Anna', 'assets/person2.png', 'Hello!'),
    new TextMessage('Bob', 'assets/person1.jpeg', 'Hi!'),
    new TextMessage('Anna', 'assets/person2.png', 'How have you been?'),
    new TextMessage('Bob', 'assets/person1.jpeg', 'I have been well, thanks for asking!'),
    new TextMessage('Bob', 'assets/person1.jpeg', 'How have you been?'),
    new TextMessage(
      'Anna',
      'assets/person2.png',
      'I have been doing awesome! I recently went to the dog shelter and adopted a puppy! His name is Pepper! He\'s ' +
      'so adorable and fluffy! I\'ll send you a picture of him. One sec!'
    ),
    new TextMessage('Bob', 'assets/person1.jpeg', 'Wow! That\'s exciting! I can\'t wait to see what he looks like'),
    new ImageMessage('Anna', 'assets/person2.png', 'assets/dog.jpeg')
  ]).pipe(
    concatMap(message => {
      const randomDelay = Math.random() * 4000 + 1000; // 1-5 seconds
      return of(message).pipe(delay(randomDelay));
    }),
    scan((acc: Message[], curr: Message) => [...acc, curr], [])
  );
}
