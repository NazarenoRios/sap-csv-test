import chai from "chai";
import chaiHttp from "chai-http";
import app from "../src/app";
const { expect } = chai;

chai.use(chaiHttp);

describe("File API Tests", () => {
  it("should upload a CSV file", (done) => {
    chai
      .request(app)
      .post("/api/files")
      .attach("csv", "src/uploads/test.csv")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal("File uploaded successfully!");
        done();
      });
  });

  it("should handle CSV upload error", (done) => {
    chai
      .request(app)
      .post("/api/files")
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal("No CSV file provided.");
        done();
      });
  });

  it("should handle CSV upload error when no file is provided", (done) => {
    chai
      .request(app)
      .post("/api/files")
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal("No CSV file provided.");
        done();
      });
  });
});
