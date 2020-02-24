import { INestApplication } from '@nestjs/common';
import { PinsService } from '../pins';

export async function seed(app: INestApplication) {
  const pinsService = app.get(PinsService);

  const pins = [
    'diy',
    'food',
    'hairstyle',
    'fingerfood',
    'desserts',
    'interior',
    'make-up',
    'upcycling',
    'gardening',
    'cocktails',
    'breakfast',
    'celebrations',
    'presents',
    'nail-design',
    'barbecue',
    'fitness',
    'decoration',
    'travel',
    'animals',
    'education',
    'tips',
    'living-room',
    'kitchen',
    'yoga',
    'quotes',
    'cats',
  ].map(topicName => ({
    title: `${topicName} Title`,
    topic: topicName,
    description: 'lorem ipsum',
    link: `https://www.google.com/search?q=${topicName}`,
    image: `assets/topics/${name}.jpg`,
  }));

  for (const pin of pins) {
    await pinsService.create(pin);
  }
}
