import { expect } from 'chai';
import 'mocha';
import * as lansky from "../../../src/scrapers/lansky/index";

(() => {
  describe("Tushy", function () {

    it("Get stars page 1", function (done) {
      this.timeout(15000);

      lansky.stars(lansky.Site.TUSHY)
      .then(result => {
        expect(result.stars.length).to.equal(18);
        done();
      })
    })

    it("Get top rated videos page 10000", function (done) {
      this.timeout(15000);

      lansky.topRated(lansky.Site.TUSHY, 10000)
      .then(result => {
        expect(result.videos.length).to.equal(0);
        done();
      })
    })

    it("Get awarded videos page 1", function (done) {
      this.timeout(15000);

      lansky.awarded(lansky.Site.TUSHY)
      .then(result => {
        expect(result.videos.length).to.equal(12);
        done();
      })
    })

    it("Get top rated videos page 1", function (done) {
      this.timeout(15000);

      lansky.topRated(lansky.Site.TUSHY)
      .then(result => {
        expect(result.videos.length).to.equal(12);
        done();
      })
    })

    it("Get latest videos page 1", function (done) {
      this.timeout(15000);

      lansky.latest(lansky.Site.TUSHY)
      .then(result => {
        expect(result.videos.length).to.equal(12);
        done();
      })
    })

    it("Get scene 'can-we-make-it-up-to-you'", function (done) {
      this.timeout(15000);

      lansky.scene("can-we-make-it-up-to-you", lansky.Site.TUSHY)
      .then(result => {
        expect(result.video.title).to.equal("Can We Make It Up To You?");
        expect(result.video.stars).to.be.an("array").that.includes("Avi Love");
        expect(result.video.tags).to.be.an("array").that.includes("gape");

        done();
      })
    });

    it("Search 'anal': Should contain tag 'First Anal'", function (done) {
      this.timeout(15000);

      lansky.search({
        query: "anal",
        studio: lansky.Site.TUSHY
      })
        .then(result => {
          expect(result.tags).to.include("First Anal");
          done();
        })
    })

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
})();