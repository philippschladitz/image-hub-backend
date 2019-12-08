import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserFacts } from './user-facts.entity';
import { Repository } from 'typeorm';
import { ObjectID } from 'mongodb';

@Injectable()
export class UserFactsService {
    constructor(
        @InjectRepository(UserFacts) private userFactsRepository: Repository<UserFacts>) {
    }

    async getLanguageAndCountry(userId: string) {
        const result = await this.getUserFacts(userId);

        if (!result) {
            return null;
        }

        return {
            language: result.language,
            country: result.country,
        };
    }

    async getGender(userId: string) {
        const result = await this.getUserFacts(userId);

        if (!result) {
            return null;
        }

        return {
            gender: result.gender,
            userDefinedGender: result.userDefinedGender,
        };
    }

    async getAvailableTopics() {
        return [
            'diy',
            'food',
            'hairstyle',
            'fingerfood',
            'desserts',
            'interior',
            'make-up',
            'upcycling',
            'gardening',
            'cocktails',
            'breakfast',
            'celebrations',
            'presents',
            'nail-design',
            'barbecue',
            'fitness',
            'decoration',
            'travel',
            'animals',
            'education',
            'tips',
            'living-room',
            'kitchen',
            'yoga',
            'quotes',
            'cats',
        ].map(name => ({
            id: name,
            imageUrl: `assets/topics/${name}.jpg`,
        }));
    }

    async getTopics(userId: string) {
        const result = await this.getUserFacts(userId);

        if (!result) {
            return null;
        }

        return {
            topics: result.topics,
        };
    }

    async isFinished(userId: string) {
        const result = await this.getUserFacts(userId);

        if (!result) {
            return false;
        }

        return result.country !== null && result.country !== undefined &&
            result.language !== null && result.language !== undefined &&
            result.gender !== null && result.gender !== undefined &&
            result.topics !== null && result.topics !== undefined &&
            result.topics.length >= 5;
    }

    async saveGender(userId: string, gender: 'male' | 'female' | 'userDefined', userDefinedGender?: string) {
        const existingUserFacts = await this.getUserFacts(userId);
        const userFacts = existingUserFacts ? existingUserFacts : new UserFacts();

        if (gender !== 'male' && gender !== 'female' && gender !== 'userDefined') {
            throw new BadRequestException('Gender must be of type string: male, female or userDefined');
        }

        userFacts.userId = new ObjectID(userId);
        userFacts.gender = gender;
        userFacts.userDefinedGender = userDefinedGender ? userDefinedGender : null;
        return this.userFactsRepository.save(userFacts);
    }

    async saveLanguageAndCountry(userId: string, language: string, country: string) {
        const existingUserFacts = await this.getUserFacts(userId);

        if (!(typeof language === 'string')) {
            throw new BadRequestException('Language is not of type string');
        }

        if (!(typeof country === 'string')) {
            throw new BadRequestException('Country is not of type string');
        }

        const userFacts = existingUserFacts ? existingUserFacts : new UserFacts();
        userFacts.userId = new ObjectID(userId);
        userFacts.country = country;
        userFacts.language = language;
        return this.userFactsRepository.save(userFacts);
    }

    async saveTopics(userId: string, topics: string[]) {
        const existingUserFacts = await this.getUserFacts(userId);

        if (!Array.isArray(topics)) {
            throw new BadRequestException('Topics must be an array of strings');
        }

        const userFacts = existingUserFacts ? existingUserFacts : new UserFacts();
        userFacts.topics = topics;
        return this.userFactsRepository.save(userFacts);
    }

    private getUserFacts(userId: string) {
        return this.userFactsRepository.findOne({
            where: {
                userId,
            },
        });
    }
}
