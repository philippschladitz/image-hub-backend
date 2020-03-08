import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserFactsController } from './user-facts.controller';
import { UserFacts } from './user-facts.entity';
import { UserFactsService } from './user-facts.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserFacts])],
  controllers: [UserFactsController],
  providers: [UserFactsService],
  exports: [UserFactsService],
})
@Global()
export class UserFactsModule {}
