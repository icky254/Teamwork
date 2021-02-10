const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../index');

// Assertion style
chai.should();
chai.use(chaiHttp);

describe('Users API', () => {
  // Test the GET Route
  describe('GET /users', () => {
    it('It should get all the users', () => {
      chai.request(server)
        .get('/api/users')
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('array');
        });
    });

    it('It should not get all the users', (done) => {
      chai.request(server)
        .get('/api/user')
        .end((err, response) => {
          response.should.have.status(404);
          done();
        });
    });
  });

  // Test the GET (by id) route
  describe('GET /users/:id', () => {
    it('It should get all the users by ID', (done) => {
      const userId = 1;
      chai.request(server)
        .get(`/api/users/${userId}`)
        .end((err, response) => {
          response.should.have.status(200);
          done();
        });
    });
  /*
    it('It should not get a user by ID', (done) => {
      const userId = 123;
      chai.request(server)
        .get(`/users/${userId}`)
        .end((err, response) => {
          response.should.have.status(404);
          response.text.should.be.equal('User does not exist');
          done();
        });
    });
*/
  });
  // Test the POST route
  describe('POST /users/', () => {
    it('It should POST a new user', (done) => {
      const user = {
        full_name: 'Josephine Wakaria',
        nickname: 'Jossy',
        age: 23,
        email: 'jossy@gmail.com'
      };
      chai.request(server)
        .post('/api/users')
        .send(user)
        .end((err, response) => {
          response.should.have.status(200);
          done();
        });
    });

  /*  it('It should not POST a new user', (done) => {
      const user = {
        full_name: 'Josephine Wakaria',
        nickname: 'Jossy',
        age: 23,
        email: 'jossy@gmail.com'
      };
      chai.request(server)
        .post('/user')
        .send(user)
        .end((err, response) => {
          response.should.have.status(400);
          done();
        });
    });
    */
  });

  // Test the PUT route
  describe('PUT /users/:id', () => {
    it('It should PUT a new user', (done) => {
      const userId = 1;
      const user = {
        full_name: 'Josephine Wakaria',
        nickname: 'Jossy',
        age: 23,
        email: 'jossy@gmail.com'
      };
      chai.request(server)
        .put(`/api/users/${userId}`)
        .send(user)
        .end((err, response) => {
          response.should.have.status(200);
          done();
        });
    });

    /* it('It should not PUT a new user without full name', (done) => {
      const userId = 1;
      const user = {
        full_name: 'Josephine',
        nickname: 'Jossy',
        age: 23,
        email: 'jossy@gmail.com'
      };
      chai.request(server)
        .put(`/users/${userId}`)
        .send(user)
        .end((err, response) => {
          response.should.have.status(400);
          done();
        });
    });
  */
  });

  // Test the DELETE route
  describe('DELETE /users/:id', () => {
    it('It should DELETE an existing user', (done) => {
      const userId = 1;
      chai.request(server)
        .delete(`/api/users/${userId}`)
        .end((err, response) => {
          response.should.have.status(200);
          done();
        });
    });
  /*
    it('It should not DELETE an existing user', (done) => {
      const userId = ;
      chai.request(server)
        .delete(`/users/${userId}`)
        .end((err, response) => {
          response.should.have.status(404);
          done();
        });
    });
    */
  });
});
