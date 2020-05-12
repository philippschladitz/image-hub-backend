import { PinResponseDto } from '../pins/pin-response.dto';
import { ObjectID } from 'typeorm';

export interface BulletinBoardResponseDto {
  id: ObjectID;
  name: string;
  description: string;
  category: string;
  pins: PinResponseDto[];
}
