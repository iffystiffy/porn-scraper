import { expect } from 'chai';
import 'mocha';
import * as lansky from "../../src/scrapers/lansky/index";

export default (() => {
  describe("Search Tushy", function () {
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