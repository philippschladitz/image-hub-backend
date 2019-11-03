import { UserFactsController } from './user-facts.controller';
import { UserFactsService } from './user-facts.service';

describe('UserFactsController', () => {
    let userFactsController: UserFactsController;
    let userFactsService: UserFactsService;

    beforeEach(() => {
        userFactsService = {
             getGender: userId => Promise.resolve({
                 gender: 'male',
             }),
             getLanguageAndCountry: userId => Promise.resolve({
                 country: 'DE',
                 language: 'German',
             }),
             getTopics: userId => Promise.resolve({
                 topics: ['a', 'b', 'c'],
             }),
             saveGender: (userId, gender, userDefinedGender) => Promise.resolve({ gender, userDefinedGender }),
             saveLanguageAndCountry: (userId, language, country) => Promise.resolve({ language, country }),
             saveTopics: (userId, topics) => Promise.resolve({ topics }),
        } as UserFactsService;
        userFactsController = new UserFactsController(userFactsService);
    });

    describe('gender', () => {
        it('should get gender', async done => {
            const result = await userFactsController.getGender({
                user: {
                    id: 'testId',
                },
            });
 
            expect(result).toEqual({
                gender: 'male',
            });

            done();
        });

        it('should save gender', async done => {
            const result = await userFactsController.postGender({
                user: {
                    id: 'testId',
                },
                body: {
                    gender: 'male',
                },
            });
 
            expect(result).toEqual({
                gender: 'male',
            });

            done();
        });

        it('should fail to get gender when user is null', () => {
            expect(() => userFactsController.getGender(null)).toThrow();
        });

        it('should fail to get gender when user is undefined', () => {
            expect(() => userFactsController.getGender(undefined)).toThrow();
        });

        it('should fail to get gender when user has no id', () => {
            expect(() => userFactsController.getGender({ user: { }})).toThrow();
        });
    });

    describe('Country', () => {
        it('should get country', async done => {
            const result = await userFactsController.getCountry({
                user: {
                    id: 'testId',
                },
            });

            expect(result).toEqual({
                country: 'DE',
                language: 'German',
            });

            done();
        });

        it('should save country', async done => {
            const result = await userFactsController.postCountry({
                user: {
                    id: 'testId',
                },
                body: {
                    country: 'DE',
                    language: 'German',
                },
            });

            expect(result).toEqual({
                country: 'DE',
                language: 'German',
            });

            done();
        });

        it('should fail to get country when user is null', () => {
            expect(() => userFactsController.getCountry(null)).toThrow();
        });

        it('should fail to get country when user is undefined', () => {
            expect(() => userFactsController.getCountry(undefined)).toThrow();
        });

        it('should fail to get country when user has no id', () => {
            expect(() => userFactsController.getCountry({ user: { }})).toThrow();
        });
    });

    describe('Topics', () => {
        it('should get topics', async done => {
            const result = await userFactsController.getTopics({
                user: {
                    id: 'testId',
                },
            });

            expect(result).toEqual({
                topics: ['a', 'b', 'c'],
            });

            done();
        });

        it('should save topics', async done => {
            const result = await userFactsController.postTopics({
                user: {
                    id: 'testId',
                },
                body: {
                    topics: ['a', 'b'],
                },
            });

            expect(result).toEqual({
                topics: ['a', 'b'],
            });

            done();
        });

        it('should fail to get topics when user is null', () => {
            expect(() => userFactsController.getTopics(null)).toThrow();
        });

        it('should fail to get topics when user is undefined', () => {
            expect(() => userFactsController.getTopics(undefined)).toThrow();
        });

        it('should fail to get topics when user has no id', () => {
            expect(() => userFactsController.getTopics({ user: { }})).toThrow();
        });
    });

});
