import request from 'supertest';
import app from '../src/app.js'; 
import {userOne,userOneId,setupDatabase} from './fixtures/test_db.js';

beforeEach(setupDatabase);

describe('POST /task/save', () => {
  const mockTask = {
    name: "nodejs unit test",
    description : "testing nodejs",
    user_id : "697dd2cd235b98a979d2031a"
  };

  it('should save a new task and return 200', async () => {
    const response = await request(app)
      .post('/task/save')
      .send(mockTask)
      .set('api-token',userOne.tokens[0].token)
      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
    expect(response.body.task).toHaveProperty('_id');
    expect(response.body.task.name).toBe("nodejs unit test");
  });
});
