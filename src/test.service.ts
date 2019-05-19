import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Test } from './test.entity';

@Injectable()
export class TestService {
  constructor(
    @InjectRepository(Test)
    private readonly testRepository: Repository<Test>,
  ) {}

  findAll(): Promise<Test[]> {
    return this.testRepository.find();
  }

  save(test: Test) {
    return this.testRepository.save(test);
  }
}