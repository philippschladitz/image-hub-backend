import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>) {
    }

    findById (id: string) {
        return this.userRepository.findOne({
            where: {
                id: id
            }
        });
    }

    findByEmail (email: string) {
        return this.userRepository.findOne({
            where: {
                email: email
            }
        });
    }

    create(user: User) {
        console.log(user);
        return this.userRepository.save(user);
    }

}