import { INestApplication } from '@nestjs/common';
import { PinsService } from '../pin-and-bulletin-board';
import { Topics } from '../shared';

export async function seed(app: INestApplication) {
  const pinsService = app.get(PinsService);

  const basicPins = Object.keys(Topics).map(topicName => ({
    title: `${topicName} Title`,
    topic: topicName as Topics,
    description: 'lorem ipsum',
    link: `https://www.google.com/search?q=${topicName}`,
    image: `assets/topics/${topicName.toLowerCase().replace('_', '-')}.jpg`,
  }));

  const pins = basicPins
    .concat(
      basicPins.map(p => ({
        ...p,
        title: `${p.title} 1`,
      })),
    )
    .concat(
      basicPins.map(p => ({
        ...p,
        title: `${p.title} 2`,
      })),
    );

  for (const pin of pins) {
    await pinsService.create(pin);
  }
}
