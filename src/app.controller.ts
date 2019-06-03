import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { TestService } from './test.service';
import { Test } from './test.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly testService: TestService
  ) {
    this.test();
  }

  private async test() {
    const testEntity = new Test();
    testEntity.name = 'Test';
    await this.testService.save(testEntity);
    const check = await this.testService.findAll();
    console.log('check', check);
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('test')
  @UseGuards(AuthGuard())
  testGuard() {
      return 'get request succeeded';
  }
}
