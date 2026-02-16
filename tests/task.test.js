import request from 'supertest';
import app from '../src/app.js'; 

let token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTg0MzJhMzUxYWZjODQwMTQ0MTljODYiLCJpYXQiOjE3NzEwNDM4OTN9.N9-KJnHYxyXsUsEWrRpnysAtX4mQL9uydlTm4KFZHJI";

describe('POST /task/save', () => {
  const mockInvoice = {
    name: "nodejs unit test",
    description : "testing nodejs",
    user_id : "697dd2cd235b98a979d2031a"
  };

  it('should save a new invoice and return 200', async () => {
    const response = await request(app)
      .post('/task/save')
      .send(mockInvoice)
      .set('api-token',token)
      .set('Accept', 'application/json');

      console.log(response.body.task._id)

    expect(response.status).toBe(200);
    expect(response.body.task).toHaveProperty('_id');
    expect(response.body.task.name).toBe("nodejs unit test");
  });
});
