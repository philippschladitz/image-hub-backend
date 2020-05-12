import { BulletinBoard } from '../bulletin-boards';
import { BulletinBoardResponseDto } from '../bulletin-boards';
import { transformPinToResponse } from './transform-pin-to-response';
import { UserService } from '../../auth/user.service';
import { PinResponseDto } from '../pins/pin-response.dto';

export async function transformBulletinBoardToResponse(
  bulletinBoard: BulletinBoard,
  userService: UserService,
) {
  const pins: PinResponseDto[] = [];
  for (const pin of bulletinBoard.pins) {
    const transformed = await transformPinToResponse(pin, userService);
    pins.push(transformed);
  }

  return {
    ...bulletinBoard,
    pins,
  } as BulletinBoardResponseDto;
}
