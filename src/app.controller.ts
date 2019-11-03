import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  @Get('test')
  @UseGuards(AuthGuard())
  testGuard() {
      return 'get request succeeded';
  }
}
