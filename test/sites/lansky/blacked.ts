import { expect } from 'chai';
import 'mocha';
import * as lansky from "../../../src/scrapers/lansky/index";

(() => {
  describe("Blacked", function () {

    it("Get frontpage", function (done) {
      this.timeout(15000);

      lansky.frontPage(lansky.Site.BLACKED)
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

    it("Get 'Zoey Laine': Should contain Zoey Laine and her video(s)", function (done) {
      this.timeout(15000);

      lansky.star({
        name: "Zoey Laine",
        studio: lansky.Site.BLACKED
      })
        .then(result => {
          expect(result)
            .to.be.an("object")
            .to.have.property("videos")
            .that.is.an("array")
            .with.length(1);
          expect(result.videos[0].title).to.equal("A Crush on my Neighbor");
          expect(result.videos[0].id).to.equal("a-crush-on-my-neighbor");
          expect(result)
            .to.have.nested.property("star")
            .that.has.nested.property("name")
            .that.equals("Zoey Laine");

          done();
        })
    })

    it("Search 'Zoey Laine': Should contain 2 stars (Zoey Laine, Zoey Monroe)", function (done) {
      this.timeout(15000);

      lansky.search({
        query: "zoey laine",
        studio: lansky.Site.BLACKED
      })
        .then(result => {
          expect(result)
            .to.be.an("object")
            .to.have.property("stars")
            .that.is.an("array")
            .with.length(2);

          expect(result)
            .to.have.nested.property("stars[0]")
            .that.has.nested.property("name")
            .that.equals("Zoey Laine");

          expect(result)
            .to.have.nested.property("stars[1]")
            .that.has.nested.property("name")
            .that.equals("Zoey Monroe");

          done();
        })
    })
  });
})();