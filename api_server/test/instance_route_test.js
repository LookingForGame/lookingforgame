const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const request = chai.request;
const errorHandler = require(__dirname + '/../lib/db_error_handler');
const mongoose = require('mongoose');
const port = process.env.PORT = 6789;
console.log('instance test. Server on port: ', port);
const server = require(__dirname + '/../_server');
const Instances = require(__dirname + '/../models/instance');

describe('Database can add/view/remove instances', () => {
  before((done) => {
    server.listen(port, 'mongodb://localhost/lfgData_test', done);
    console.log('Instance server open on port: ', port);
  });
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.disconnect(() => {
        console.log('Instance server is closing');
        server.close(done);
      });
    });
  });

  it('should be able to POST and instance of a game', (done) => {
    request('localhost:' + port)
    .post('/api/instances')
    .send({
      host: "Chthulu",
      game: "checkers",
      playersNeeded: 4,
      signedUp: 1
    })
    .end((err, res) => {
      console.log(res.body);
      expect(err).to.eql(null);
      expect(res.status).to.eql(200);
      expect(res.body.host).to.eql('Chthulu');
      expect(res.body.game).to.eql('checkers');
      expect(res.body.signedUp).to.eql(1);
      done();
    })
  })

  it('should be able to GET the instance just added', (done) => {
    request('localhost:' + port)
    .get('/api/instances')
    .end((err, res) => {
      console.log('instances res: ', res.body[0].host);
      expect(err).to.eql(null);
      expect(res.status).to.eql(200);
      expect(res.body).to.be.an('array');
      expect(res.body[0].host).to.eql('Chthulu');
      expect(res.body[0].playersNeeded).to.eql(4);
      done();
    })
  })
})
