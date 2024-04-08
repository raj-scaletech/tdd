import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('UserController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule]
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/user/register (POST)', async () => {
        const res = await request(app.getHttpServer())
            .post('/user/register')
            .send({
                username: 'rajsoni2k2',
                password: 'rajsoni',
                email: 'rajsoni2k2@gmail.com'
            })
            .expect(201);
        expect(res.body).toHaveProperty('id');
    });

    it('user/login (POST)', async () => {
        const res = await request(app.getHttpServer())
            .post('/user/login')
            .send({
                email: 'pratham@gmail.com',
                password: 'pratham'
            })
            .expect(201);
        expect(res.body).toHaveProperty('token')
    })

    it('user/profile (GET)', async () => {
        const res = await request(app.getHttpServer())
            .get('/user/profile')
            .send({
                email: 'rajsoni2k2@gmail.com',
            })
            .expect(200);
        expect(res.body).toHaveProperty('id')
        expect(res.body).toHaveProperty('email')
        expect(res.body).toHaveProperty('username')
    })

});

// If you haven't created the controller and service yet, your test case won't pass because the /user/register endpoint doesn't exist in your application. The 404 "Not Found" error indicates that the endpoint is not registered in your application routes.
// To make your test case pass, you need to ensure that:
// The /user/register endpoint is defined in your UserController.
// The UserController is properly imported and configured in your UserModule.
// The UserModule is properly imported and configured in your AppModule.
// Your Nest application is properly initialized and running before executing the 