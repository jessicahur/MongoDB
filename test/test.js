const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;

const app = require('../lib/app');
const Employee = require('../model/Employee');
const expect = chai.expect;

const mongoose = require('mongoose');


chai.use(chaiHttp);



describe ('Mongo-Mongoose', () => {
  before((done) => {
    const db = mongoose.connection;
    mongoose.connect('mongodb://localhost/test');
    db.once('open', () => {
      Employee.remove({"_id": "testing"}, () => {
        done();
      });
    });
  });

  //POST
  it('should post the json employee to database and return the json obj back', (done) => {
    var testJson = {
          _id: "testing",
          name: "testing",
          username: "testing",
          DOB: "2000-01-01",
          address: "testing",
          phone: "999-999-9999",
          email: "test@testing.com",
          position: "accountant"
        }
    chai.request(app)
        .post('/employees')
        .send(testJson)
        .end((err, res) => {
          expect(err).to.be.null;
          var receivedObj = res.body;
          receivedObj.DOB = receivedObj.DOB.substr(0, 10);

          console.log(Object.keys(receivedObj));

          var diff = Object.keys(receivedObj).reduce( (initialVal, currentKey) => {
            if (receivedObj[currentKey] !== testJson[currentKey]) {
                initialVal[currentKey] = receivedObj[currentKey];
            }
            return initialVal;
          }, {} );

          assert.equal(Object.keys(diff).length, 1);
          done();
        });
  });

  //GET
  it('should get an array of json objects back with /GET', (done) => {
    chai.request(app)
        .get('/employees')
        .end((err, res) => {
          expect(200);
          expect(res.body.length).to.not.be.undefined;
          done();
        });
  });


});

