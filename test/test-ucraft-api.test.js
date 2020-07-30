import supertest from 'supertest'
import * as express from '../server/express'

process.env.NODE_ENV = 'test'
const app = supertest(express.init())

describe('check access to pages',()=>{

    const app = supertest(express.init())

    it('access sign up page', async() => {
        const response = await app.get('/')
        expect(response.status).toBe(200)
		expect(response.text).toBeDefined()
    });

    it('access login page', async() => {
        const response = await app.get('/login')
        expect(response.status).toBe(200)
		expect(response.text).toBeDefined()
    });

    it('access success page', async() => {
        const response = await app.get('/success')
        expect(response.status).toBe(200)
		expect(response.text).toBeDefined()
    });

    it('access fail page', async() => {
        const response = await app.get('/fail')
        expect(response.status).toBe(200)
		expect(response.text).toBeDefined()
    });

    it('access profile page', async() => {
        const response = await app.get('/fail')
        expect(response.status).toBe(200)
		expect(response.text).toBeDefined()
    });
})

describe('check all the rest APIs',()=>{

    const getUniqueIdPassword = () => {
        return{
            email: 'dummy' + Math.random() * 10000 + '@dummy.com',
            password: 'dummy' + Math.random() * 10000
        }
    }

    it('access login register publish API', async() => {

        const cred = getUniqueIdPassword()
        let response = await app
            .post('/api/v1/user/login')
            .send(cred)
        
        if(response.status === 401)
        {
            response = await app
                .post('/api/v1/user/register')
                .send({...cred, fullName: 'dummy'})
            expect(response.status).toBe(200)
            expect(response.body.data.success).toBeTruthy()
            expect(response.body.message).toBe('User registered Successfully!!')
        }
        else {
            response = await app
                .post('/api/v1/user/register')
                .send({...cred, fullName: 'dummy'})
            expect(response.status).toBe(400);
        }

        response = await app
            .post('/api/v1/user/login')
            .send(cred)
        expect(response.status).toBe(200)
        expect(response.body.data.accessToken).toBeDefined()
        expect(response.body.data.username).toBeDefined()
        expect(response.body.message).toBe('User logged in Successfully!!')
        const token = response.body.data.accessToken

        response = await app
            .post('/publish')
            .send({message: 'Check'})
        expect(response.status).toBe(401)

        response = await app
            .post('/publish')
            .auth(token, { type: 'bearer' })
            .send({message: 'Check'})
        expect(response.status).toBe(200)
    })
});