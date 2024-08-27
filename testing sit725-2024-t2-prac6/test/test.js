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




  // Login tests  Starts
describe("Login API", function() {
  var url = "http://localhost:3040/login";

  it("should return status 200 and 'Login OK' for valid credentials", function(done) {
      
      request.post(
          {
              url: url,
              json: { email: "nimshabohara8848@gmail.com", password: "Ashish@123" } // Replace with actual credentials
          },
          function(error, response, body) {
              expect(response.statusCode).to.equal(200);
              expect(body.message).to.equal("Login OK");
              done();
          }
      );
  });

  it("should return status 401 and 'Invalid Credentials' for wrong credentials", function(done) {
      request.post(
          {
              url: url,
              json: { email: "abohara195", password: "Password" }
          },
          function(error, response, body) {
              expect(response.statusCode).to.equal(401);
              expect(body.message).to.equal("Invalid Credentials");
              done();
          }
      );
  });

  it("should return status 400 for missing credentials", function(done) {
      request.post(
          {
              url: url,
              json: {} // Empty body to simulate missing credentials
          },
          function(error, response, body) {
              expect(response.statusCode).to.equal(400);
              expect(body.message).to.equal("Missing Credentials");
              done();
          }
      );
  });
});

//Login Test Ends

describe("Public Routes", function() {

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
});

describe("Protected Routes", function() {

  // Assuming login is required to access the dashboard
  var loginUrl = "http://localhost:3040/login";
  var dashboardUrl = "http://localhost:3040/dashboard";

  // Login and obtain session or token (this could vary based on your app's authentication mechanism)
  var jar = request.jar(); // To handle cookies for session management

  before(function(done) {
      request.post(
          {
              url: loginUrl,
              json: { username: "validUser", password: "validPassword" }, // Use correct credentials
              jar: jar // Save cookies in the jar
          },
          function(error, response, body) {
              expect(response.statusCode).to.equal(200);
              done();
          }
      );
  });

  // Dashboard Page Test after login
  describe("GET /dashboard (Dashboard Page)", function() {
      it("should return status 200 after successful login", function(done) {
          request.get({ url: dashboardUrl, jar: jar }, function(error, response, body) {
              expect(response.statusCode).to.equal(200);
              done();
          });
      });

      it("should contain 'Dashboard' in the body", function(done) {
          request.get({ url: dashboardUrl, jar: jar }, function(error, response, body) {
              expect(body).to.contain("Dashboard");
              done();
          });
      });
  });
});