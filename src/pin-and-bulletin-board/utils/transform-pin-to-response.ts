import { ObjectID } from 'typeorm';
import { Pin } from '../pins/pin.entity';
import { PinResponseDto } from '../pins/pin-response.dto';
import { UserService } from '../../auth/user.service';

async function mapUserWithName<
  T extends {
    userId: ObjectID;
  },
  U extends T & {
    userName: string;
  }
>(array: T[], userService: UserService) {
  const newArray: U[] = [];
  if (array && array.length > 0) {
    for (const arrayElement of array) {
      const user = await userService.findById(arrayElement.userId);
      newArray.push({
        ...arrayElement,
        userName: user.name,
      } as U);
    }
  }
  return newArray;
}

export async function transformPinToResponse(
  pin: Pin,
  userService: UserService,
) {
  const comments = await mapUserWithName<
    {
      comment: string;
      createdAt: Date;
      userId: ObjectID;
    },
    {
      comment: string;
      createdAt: Date;
      userId: ObjectID;
      userName: string;
    }
  >(pin.comments, userService);

  const photos = await mapUserWithName<
    {
      base64: string;
      comment: string;
      userId: ObjectID;
    },
    {
      base64: string;
      comment: string;
      userId: ObjectID;
      userName: string;
    }
  >(pin.photos, userService);

  return {
    ...pin,
    comments,
    photos,
  } as PinResponseDto;
}
