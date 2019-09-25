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

    it("Get stars page 1", function (done) {
      this.timeout(15000);

      lansky.stars(lansky.Site.BLACKED)
      .then(result => {
        expect(result.stars.length).to.equal(18);
        done();
      })
    })

    it("Get top rated videos page 10000", function (done) {
      this.timeout(15000);

      lansky.topRated(lansky.Site.BLACKED, 10000)
      .then(result => {
        expect(result.videos.length).to.equal(0);
        done();
      })
    })

    it("Get awarded videos page 1", function (done) {
      this.timeout(15000);

      lansky.awarded(lansky.Site.BLACKED)
      .then(result => {
        expect(result.videos.length).to.equal(12);
        done();
      })
    })

    it("Get top rated videos page 1", function (done) {
      this.timeout(15000);

      lansky.topRated(lansky.Site.BLACKED)
      .then(result => {
        expect(result.videos.length).to.equal(12);
        done();
      })
    })

    it("Get latest videos page 1", function (done) {
      this.timeout(15000);

      lansky.latest(lansky.Site.BLACKED)
      .then(result => {
        expect(result.videos.length).to.equal(12);
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

    it("Get scene 'young-beauty-is-in-trouble'", function (done) {
      this.timeout(15000);

      lansky.scene("young-beauty-is-in-trouble", lansky.Site.BLACKED)
      .then(result => {
        expect(result.video.title).to.equal("Young Beauty is in Trouble");
        expect(result.video.stars).to.be.an("array").that.includes("Adria Rae");

        done();
      })
    });

    it("Get null scene", function (done) {
      this.timeout(15000);

      lansky.scene("xyz", lansky.Site.BLACKED)
      .then(result => {
        expect(result.video).to.equal(null);

        done();
      })
    });
  });
})();