import { UserFactsService } from './user-facts.service';
import { Repository } from 'typeorm';
import { ObjectID } from 'mongodb';
import { UserFacts } from './user-facts.entity';

describe('UserFactsService', () => {
    let userFactsService: UserFactsService;
    const findOneSpy = jest.fn();
    const userId = new ObjectID();

    beforeEach(() => {
        userFactsService = new UserFactsService({
            findOne: findOneSpy,
            save: userFacts => Promise.resolve(userFacts),
        } as unknown as Repository<UserFacts>);
    });

    describe('Gender', () => {
        it('should get gender male', async done => {
            findOneSpy.mockReturnValue(Promise.resolve({
                gender: 'male',
            }));
            const result = await userFactsService.getGender(userId);
            expect(result).toEqual({
                gender: 'male',
            });
            done();
        });

        it('should get gender female', async done => {
            findOneSpy.mockReturnValue(Promise.resolve({
                gender: 'female',
            }));
            const result = await userFactsService.getGender(userId);
            expect(result).toEqual({
                gender: 'female',
            });
            done();
        });

        it('should get gender user defined', async done => {
            findOneSpy.mockReturnValue(Promise.resolve({
                gender: 'userDefined',
                userDefinedGender: 'userDefinedGenderName',
            }));
            const result = await userFactsService.getGender(userId);
            expect(result).toEqual({
                gender: 'userDefined',
                userDefinedGender: 'userDefinedGenderName',
            });
            done();
        });

        it('should get no gender', async done => {
            findOneSpy.mockReturnValue(Promise.resolve(null));
            const result = await userFactsService.getGender(userId);
            expect(result).toBeNull();
            done();
        });

        it('should save gender male when no user facts exist', async done => {
            const result = await userFactsService.saveGender(userId, 'male');
            expect(result).toEqual(
                expect.objectContaining({
                gender: 'male',
            }));
            done();
        });

        it('should save gender female when no user facts exist', async done => {
            const result = await userFactsService.saveGender(userId, 'female');
            expect(result).toEqual(
                expect.objectContaining({
                gender: 'female',
            }));
            done();
        });

        it('should save gender userDefined when no user facts exist', async done => {
            const result = await userFactsService.saveGender(userId, 'userDefined', 'userDefinedGenderName');
            expect(result).toEqual(expect.objectContaining({
                gender: 'userDefined',
                userDefinedGender: 'userDefinedGenderName',
            }));
            done();
        });

        it('should save gender male when user facts exist', async done => {
            findOneSpy.mockReturnValue(Promise.resolve({
                gender: 'female',
            }));
            const result = await userFactsService.saveGender(userId, 'male');
            expect(result).toEqual(expect.objectContaining({
                gender: 'male',
            }));
            done();
        });

        it('should save gender female when user facts exist', async done => {
            findOneSpy.mockReturnValue(Promise.resolve({
                gender: 'male',
            }));
            const result = await userFactsService.saveGender(userId, 'female');
            expect(result).toEqual(expect.objectContaining({
                gender: 'female',
            }));
            done();
        });

        it('should save gender userDefined when user facts exist', async done => {
            findOneSpy.mockReturnValue(Promise.resolve({
                gender: 'userDefined',
                userDefinedGender: 'userDefinedGenderName',
            }));
            const result = await userFactsService.saveGender(userId, 'userDefined', 'userDefinedGenderName2');
            expect(result).toEqual(expect.objectContaining({
                gender: 'userDefined',
                userDefinedGender: 'userDefinedGenderName2',
            }));
            done();
        });

        it('should throw error if gender is not an accepted string', async done => {
            findOneSpy.mockReturnValue(Promise.resolve({
                gender: 'userDefined',
                userDefinedGender: 'userDefinedGenderName',
            }));

            await expect(userFactsService.saveGender(userId, { notAcceptableObject: 'gender' } as any)).rejects.toThrow();
            done();
        });
    });

    describe('Language and Country', () => {
        it('should get country and language', async done => {
            findOneSpy.mockReturnValue(Promise.resolve({
                country: 'DE',
                language: 'German',
            }));
            const result = await userFactsService.getLanguageAndCountry(userId);
            expect(result).toEqual({
                country: 'DE',
                language: 'German',
            });
            done();
        });

        it('should save country and language', async done => {
            findOneSpy.mockReturnValue(Promise.resolve({
                country: 'DE',
                language: 'German',
            }));
            const result = await userFactsService.saveLanguageAndCountry(userId, 'German', 'DE');
            expect(result).toEqual(expect.objectContaining({
                country: 'DE',
                language: 'German',
            }));
            done();
        });

        it('should throw error if language is not a string', async done => {
            await expect(userFactsService.saveLanguageAndCountry(userId, { notAcceptableObject: '' } as any, 'DE')).rejects.toThrow();
            done();
        });

        it('should throw error if country is not a string', async done => {
            await expect(userFactsService.saveLanguageAndCountry(userId, 'German', null)).rejects.toThrow();
            done();
        });
    });

    describe('Topics', () => {
        it('should get an array of topics', async done => {
            findOneSpy.mockReturnValue(Promise.resolve({
                topics: ['a', 'b', 'c'],
            }));
            const result = await userFactsService.getTopics(userId);
            expect(result).toEqual({
                topics: ['a', 'b', 'c'],
            });
            done();
        });

        it('should save topics', async done => {
            findOneSpy.mockReturnValue(Promise.resolve({
               topics: ['a'],
            }));
            const result = await userFactsService.saveTopics(userId, ['b', 'c']);
            expect(result).toEqual(expect.objectContaining({
                topics: ['b', 'c'],
            }));
            done();
        });

        it('should throw error if topics is not an array', async done => {
            await expect(userFactsService.saveTopics(userId, { topic: 't '} as any)).rejects.toThrow();
            done();
        });
    });
});
