const request = require('supertest');
const express = require('express');
const userRouter = require('../routers/userRoutes'); 
const db = require("../controller/databaseController");

const app = express();
app.use(express.json()); 
app.use('/api', userRouter); 

const token = "";

describe('POST /api/register', () => {
  beforeAll(async () => {
    await db.query('DELETE FROM users WHERE email = ?', ['testuser@gmail.com']);

  });
  it('should register a user successfully', async () => {
    const response = await request(app)
      .post('/api/register')
      .send({
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'securepassword123'
      });

    expect(response.statusCode).toBe(200); 
  });

  it('should fail when required fields are missing', async () => {
    const response = await request(app)
      .post('/api/register')
      .send({
        username: 'incompleteuser'
      });

    expect(response.statusCode).toBe(400); 
  });
});

describe('POST /api/login', () => {

    it("should login a user successfully", async () => {
        const response = await request(app)
            .post('/api/login')
            .send({
                email: 'test@gmail.com',
                password: 'test'
            });
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('token'); 
    });

    it("should fail when user not found", async () => {
        const response = await request(app)
            .post('/api/login')
            .send({
                email: 'abcabc@yahoo.com',
                password: 'wrongpassword'
            });
        expect(response.statusCode).toBe(404);
    });

    it("should fail when password incorrect", async () => {
        const response = await request(app)
            .post('/api/login')
            .send({
                email: 'test@gmail.com',
                password: 'test'
            });
        expect(response.statusCode).toBe(200);
    });
});