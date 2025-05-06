const request = require('supertest');
const express = require('express');
const postRouter = require('../routers/postRouter'); 
const userRouter = require('../routers/userRoutes');
const db = require("../controller/databaseController");

const app = express();
app.use(express.json()); 
app.use('/api', postRouter); 
app.use("/api2", userRouter);

let token = "";
let postId = 0;

beforeAll(async () => {
    const response = await request(app)
        .post('/api2/login')
        .send({
            email: 'test@gmail.com',
            password: 'test'
        });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('token'); 

    token = response.body.token;
});

afterAll(async () => {
    await db.query('DELETE FROM posts WHERE id = ?', [postId]);
});

describe('POST api/tweet', () => {
  it('should fail to create new post with invalid token', async () => {
    const response = await request(app)
      .post('/api/tweet')
      .send({
        token: 'testtoken',
        title: 'Test Post',
        content: 'This is a test post content.'
      });
    expect(response.statusCode).toBe(401);
  });

  it("should fail to create new post with missing title", async () => {
    const response = await request(app)
        .post('/api/tweet')
        .send({
            token: token,
            content: 'This is a test post content.'
        });
    expect(response.statusCode).toBe(400);
  });

  it("should fail to create new post with missing content", async () => {
    const response = await request(app)
        .post('/api/tweet')
        .send({
            token: token,
            title: 'Test Post'
        });
    expect(response.statusCode).toBe(400);
  });

  it("should create a new post successfully", async () => {
    const response = await request(app)
        .post('/api/tweet')
        .send({
            token: token,
            title: 'Test Post',
            content: 'This is a test post content.'
        });
    expect(response.statusCode).toBe(200);

    expect(response.body).toHaveProperty('postId');
    postId = response.body.postId; 
  });
});