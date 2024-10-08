var expect  = require("chai").expect;
var request = require("request");

describe("Add Two Numbers", function() {
    var url = "http://localhost:3040/addTwoNumbers/3/5";
    it("returns status 200 to check if api works", function(done) {
        request(url, function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            done()
          });
    });
    it("returns statusCode key in body to check if api give right result should be 200", function(done) {
        request(url, function(error, response, body) {
            body = JSON.parse(body)
            expect(body.statusCode).to.equal(200);
            done()
          });
    });
    it("returns the result as number", function(done) {
        request(url, function(error, response, body) {
            body = JSON.parse(body)
            expect(body.result).to.be.a('number');
            done()
          });
    });
    it("returns the result equal to 8", function(done) {
      request(url, function(error, response, body) {
          body = JSON.parse(body)
          expect(body.result).to.equal(8);
          done()
        });
  });
  it("returns the result not equal to 15", function(done) {
    request(url, function(error, response, body) {
        body = JSON.parse(body);
        expect(body.result).to.not.equal(15);
        done()
      });
});
  });

  describe("Add Two strings", function() {
    var url = "http://localhost:3040/addTwoNumbers/a/b";
    it("should return status 200", function(done) {
        request(url, function(error, response, body) {
           // resp = JSON.parse(response);
           // console.log(response);
            expect(response.statusCode).to.equal(200);
            done()
          });
    });
    it("returns statusCode key in body to check if api gives right result should be 400", function(done) {
        request(url, function(error, response, body) {
            body = JSON.parse(body)
            expect(body.statusCode).to.equal(400);
            done()
          });
    });
    it("returns the result as null", function(done) {
        request(url, function(error, response, body) {
            body = JSON.parse(body)
            expect(body.result).to.be.a('null');
            done()
          });
    });
  });






describe("Public Routes Successfully Reaches", function() {

  // Index Page Test
  describe("GET / (Index Page)", function() {
      var url = "http://localhost:3040/";

      it("should return status 200", function(done) {
          request.get(url, function(error, response, body) {
              expect(response.statusCode).to.equal(200);
              done();
          });
      });

      it("should contain 'Welcome' in the body", function(done) {
          request.get(url, function(error, response, body) {
              expect(body).to.contain("Welcome");
              done();
          });
      });
  });

  describe("GET / (Login Page)", function() {
    var url = "http://localhost:3040/login";

    it("should return status 200 login page found", function(done) {
        request.get(url, function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });

    it("should contain 'email' and 'password' in the body", function(done) {
        request.get(url, function(error, response, body) {
            expect(body).to.contain("email");
            done();
        });
    });
});

});