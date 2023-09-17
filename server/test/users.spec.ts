import chai from "chai";
import chaiHttp from "chai-http";
import app from "../src/app";
const { expect } = chai;

chai.use(chaiHttp);

describe("User API Tests", () => {
  it("should search for users", (done) => {
    chai
      .request(app)
      .get("/api/users?q=john")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array");
        done();
      });
  });

  it("should handle missing query parameter", (done) => {
    chai
      .request(app)
      .get("/api/users")
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal("You did not include any parameters");
        done();
      });
  });

  it("should handle search with no matching results", (done) => {
    chai
      .request(app)
      .get("/api/users?q=nonexistent")
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal("No matching results found.");
        done();
      });
  });

  it("should handle invalid query parameters", (done) => {
    chai
      .request(app)
      .get("/api/users?q=<invalid>")
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal("No matching results found.");
        done();
      });
  });
});
