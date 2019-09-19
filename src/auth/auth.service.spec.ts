import { JwtService } from '@nestjs/jwt';
import { ObjectID } from 'typeorm';

import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { User } from './user.entity';

describe('AuthService', () => {
    let userService: UserService;
    let jwtService: JwtService;
    let authService: AuthService;

    beforeEach(() => {
        userService = {
            findByEmail: jest.fn().mockImplementation(email => ({
                email,
                id: {
                    generationTime: 'testGenerationTime',
                } as unknown as ObjectID,
                password: 'hashedPassword',
                // tslint:disable-next-line: no-empty
                hashPassword: () => {},
                validatePassword: password => true,
            } as User)),
        } as unknown as UserService;

        jwtService = {
            sign: payload => 'testAccessToken',
        } as JwtService;

        authService = new AuthService(userService, jwtService);
    });

    it('should login', async done => {
        const response = await authService.login({
            email: 'test@email.de',
            password: '1234',
        } as User);

        expect(response).toEqual({
            expires_in: 3600,
            access_token: 'testAccessToken',
            user_id: {
                id: {
                    generationTime: 'testGenerationTime',
                },
                email: 'test@email.de',
            },
            status: 200,
        });

        done();
    });

    it('should not login when user is not found', async done => {
        userService.findByEmail = jest.fn().mockImplementation(email => Promise.resolve(undefined));
        const response = await authService.login({
            email: 'test',
            password: '0',
        } as User);

        expect(response).toEqual({
            status: 401,
        });

        done();
    });

    it('should not login when password is incorrect', async done => {
        userService.findByEmail = jest.fn().mockImplementation(email => Promise.resolve({
            validatePassword: password => false,
        }));

        const response = await authService.login({
            email: 'test',
            password: '0',
        } as User);

        expect(response).toEqual({
            status: 401,
        });

        done();
    });

    it('should register', async done => {
        userService.findByEmail = jest.fn().mockReturnValue(Promise.resolve(null));
        userService.create = jest.fn().mockImplementation((user: User) => Promise.resolve({
            id: {},
            email: user.email,
            password: 'hashedPassword',
        } as User));

        const response = await authService.register({
            email: 'john-doe@email.de',
            password: '1234',
        } as User);

        expect(response).toEqual({
            email: 'john-doe@email.de',
        });

        done();
    });

    it('should not register when user exists', async done => {
        userService.findByEmail = jest.fn().mockReturnValue(Promise.resolve({
            id: {},
            email: 'foo@email.de',
            password: 'hashedPassword',
        }));

        await expect(authService.register({
            email: 'foo@email.de',
            password: '1234',
        } as User)).rejects.toThrow();

        done();
    });

    it('should validate user', async done => {
        userService.findByEmail = jest.fn().mockReturnValue(Promise.resolve({
            email: 'found@email.de',
            password: 'hashed',
        } as User));

        const response = await authService.validateUser({
            id: 'id',
            email: 'found@email.de',
        });

        expect(response).toBeTruthy();

        done();
    });

    it('should fail to validate user', async done => {
        userService.findByEmail = jest.fn().mockReturnValue(Promise.resolve(null));

        const response = await authService.validateUser({
            id: '',
            email: 'found@email.de',
        });

        expect(response).toBeFalsy();

        done();
    });
});
