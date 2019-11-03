import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserFactsController } from './user-facts.controller';
import { UserFacts } from './user-facts.entity';
import { UserFactsService } from './user-facts.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
        UserFacts,
    ]),
  ],
  controllers: [
    UserFactsController,
  ],
  providers: [
    UserFactsService,
  ],
})
export class UserFactsModule { }
