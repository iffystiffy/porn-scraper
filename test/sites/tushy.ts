import { expect } from 'chai';
import 'mocha';
import * as lansky from "../../src/scrapers/lansky/index";

export default (() => {
  describe("Tushy", function () {

    it("Get frontpage", function (done) {
      this.timeout(15000);

      lansky.frontPage(lansky.Site.TUSHY)
        .then(result => {
          expect(result)
          .to.be.an("object")
          .to.have.property("newest")
          .that.is.an("object")
          .that.has.property("title");

          expect(result)
          .to.be.an("object")
          .to.have.property("popular")
          .that.is.an("array")
          .that.is.not.empty;

          expect(result)
          .to.be.an("object")
          .to.have.property("latest")
          .that.is.an("array")
          .that.is.not.empty;

          expect(result)
          .to.be.an("object")
          .to.have.property("stars")
          .that.is.an("array")
          .that.is.not.empty;

          done();
        })
    })

    it("Search 'Kristen Scott': Should contain 3 videos", function (done) {
      this.timeout(15000);

      lansky.search({
        query: "kristen scott",
        studio: lansky.Site.TUSHY
      })
        .then(result => {
          expect(result)
            .to.be.an("object")
            .to.have.property("videos")
            .that.is.an("array")
            .with.length(3);

          done();
        })
    })
  });
})