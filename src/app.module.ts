import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserFactsModule } from './user-facts';
import { PinAndBulletinBoardModule } from './pin-and-bulletin-board';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'localhost',
      port: 27017,
      database: 'test',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    AuthModule,
    UserFactsModule,
    PinAndBulletinBoardModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
