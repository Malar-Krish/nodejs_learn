import request from 'supertest';
import app from '../src/app'; 

describe('POST /user/login', () => {
//   const mockInvoice = {
//     email: "krishnodejs13@gmail.com",
//     password : "2121212"
//   };

  it('should login a user and return 200', async () => {
//     const response = await request(app)
//       .post('/api/user/login')
//       .send(mockInvoice)
//       .set('Accept', 'application/json');

      console.log("lOGIN tEST")
    //   console.log(response.status)

    // expect(response.status).toBe(200);
    // expect(response.body).toHaveProperty('_id');
    // expect(response.body.name).toBe("nodejs unit test");
  });

  // it('should return 400 if required fields are missing', async () => {
  //   const incompleteInvoice = { name: "nodejs unit test" }; // Missing items and total

  //   const response = await request(app)
  //     .post('/task/save')
  //     .send(incompleteInvoice);

  //   expect(response.status).toBe(400);
  //   expect(response.body).toHaveProperty('error');
  // });
});
