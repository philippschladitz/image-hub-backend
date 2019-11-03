import { Controller, Get, UseGuards, Post, Request, BadRequestException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserFactsService } from './user-facts.service';

@Controller('user-facts')
export class UserFactsController {
  constructor(
      private readonly userFactsService: UserFactsService,
  ) { }

  @Get('gender')
  @UseGuards(AuthGuard())
  getGender(@Request() req) {
      const user = req.user;
      this.validateUser(user);
      return this.userFactsService.getGender(user.id);
  }

  @Get('country')
  @UseGuards(AuthGuard())
  getCountry(@Request() req) {
    const user = req.user;
    this.validateUser(user);
    return this.userFactsService.getLanguageAndCountry(user.id);
  }

  @Get('topics')
  @UseGuards(AuthGuard())
  getTopics(@Request() req) {
    const user = req.user;
    this.validateUser(user);
    return this.userFactsService.getTopics(user.id);
  }

  @Post('gender')
  @UseGuards(AuthGuard())
  postGender(@Request() req) {
    const user = req.user;
    this.validateUser(user);

    const { gender, userDefinedGender } = req.body;

    return this.userFactsService.saveGender(user.id, gender, userDefinedGender);
  }

  @Post('country')
  @UseGuards(AuthGuard())
  postCountry(@Request() req) {
    const user = req.user;
    this.validateUser(user);

    const { language, country } = req.body;

    return this.userFactsService.saveLanguageAndCountry(user.id, language, country);
  }

  @Post('topics')
  @UseGuards(AuthGuard())
  postTopics(@Request() req) {
    const user = req.user;
    this.validateUser(user);

    const { topics } = req.body;

    return this.userFactsService.saveTopics(user.id, topics);
  }

  private validateUser(user) {
    if (user === undefined || user === null ||  !user.id) {
        throw new BadRequestException('User or user id is undefined');
    }
  }
}
