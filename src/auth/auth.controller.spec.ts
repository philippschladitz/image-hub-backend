import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('AuthController', () => {
    let authServiceStub: AuthService;
    let authController: AuthController;

    beforeEach(() => {
        authServiceStub = {
            login: jest.fn().mockReturnValue({
                expires_in: 3600,
                access_token: 'testToken',
                user_id: {
                    id: 'userId',
                    email: 'test@mail.de',
                },
                status: 200,
            }),
            register: jest.fn().mockReturnValue({
                email: 'test@mail.de',
                password: 'hashedPassword',
                id: 'userId',
            } as unknown as User),
        } as unknown as AuthService;
        authController = new AuthController(authServiceStub);
    });

    it('should login', async done => {
        const response = await authController.login({
            email: 'test@mail.de',
            password: '1234',
        });

        expect(response).toEqual({
            expires_in: 3600,
            access_token: 'testToken',
            user_id: {
                id: 'userId',
                email: 'test@mail.de',
            },
            status: 200,
        });

        done();
    });

    it('should not login', async done => {
        authServiceStub.login = jest.fn().mockReturnValue({
            status: 401,
        });

        const response = await authController.login({
            email: 'test@mail.de',
            password: '1234',
        });

        expect(response).toEqual({ status: 401 });
        done();
    });

    it('should register', async done => {
        const response = await authController.register({
            email: 'test@mail.de',
            password: '1234',
        });

        expect(response).toEqual({
            email: 'test@mail.de',
            password: 'hashedPassword',
            id: 'userId',
        });

        done();
    });

    it('should not register', async done => {
        authServiceStub.register = jest.fn().mockImplementation(() => {
            throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
        });

        expect(() => authController.register({
            email: '',
            password: '1234',
        })).toThrow();

        done();
    });
});
