const request = require('supertest');
const app = require('../../app');
require('dotenv').config({ path: './src/config/.env' });

describe('Test Secrets API', () => {
    beforeAll(() => {
        require('../../database/connection');
    })

    describe('Get All The Secrets', () => {
        test('should return 200 status code', async () => {
            await request(app).get('/secrets').expect(200);
        })
    });

    describe('Get A Secret', () => {
        test('should return a 200 status code', async () => {
            const hash = `f9a0110fd8d6eed2f67b46f7a0a0a1cf6003502edc0a481f8f4de7db5acbd37a`;
            await request(app).get(`/secrets/${hash}`).send(hash).expect(200);
        })

        test('should fail and return a 404 status code because the hash is not correct', async () => {
            const hash = "d3";
            await request(app).get(`/secrets/${hash}`).send().expect(404);

        })

        test('should fail and return 404 status code because the hash has expired or is not in the database', async () => {
            const hash = `d3cdb57888b2d1ce84a8d2031848131cf46c420a518758796cef369e95805af6`;
            await request(app).get(`/secrets/${hash}`).send(hash).expect(404);
        })
    })

    describe('Add a new secret', () => {
        const newSecret = {
            hash: 'srdfhgjhknsdfhgjkl',
            secretText: 'encryp4896565165asfjbafjbfakjbskat(secgsjdkagdsjksdgkretText)'
        }

        const missingProperty = {
            hash: 'srdfhgjhknsdfhgjkl',
        }

        test('should create a new secret and return status code 201', async () =>{
            await request(app).post('/secrets').send(newSecret).expect(201);
        })

        test('should fail and return a status code 400', async () => {
            const error = new Error('Please, provide a secret text.');
            const response = await request(app).post('/secrets').send(missingProperty).expect(400);
            expect(response.body).toMatchObject({ error: error.message })
        })
    })
})

