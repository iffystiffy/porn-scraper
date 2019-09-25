import { expect } from 'chai';
import 'mocha';
import * as lansky from "../../../src/scrapers/lansky/index";

(() => {
  describe("Vixen", function () {

    it("Get frontpage", function (done) {
      this.timeout(15000);

      lansky.frontPage(lansky.Site.VIXEN)
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

      lansky.stars(lansky.Site.VIXEN)
      .then(result => {
        expect(result.stars.length).to.equal(18);
        done();
      })
    })

    it("Get awarded videos page 1", function (done) {
      this.timeout(15000);

      lansky.awarded(lansky.Site.VIXEN)
      .then(result => {
        expect(result.videos.length).to.equal(12);
        done();
      })
    })

    it("Get top rated videos page 10000", function (done) {
      this.timeout(15000);

      lansky.topRated(lansky.Site.VIXEN, 10000)
      .then(result => {
        expect(result.videos.length).to.equal(0);
        done();
      })
    })

    it("Get top rated videos page 1", function (done) {
      this.timeout(15000);

      lansky.topRated(lansky.Site.VIXEN)
      .then(result => {
        expect(result.videos.length).to.equal(12);
        done();
      })
    })

    it("Get latest videos page 1", function (done) {
      this.timeout(15000);

      lansky.latest(lansky.Site.VIXEN)
      .then(result => {
        expect(result.videos.length).to.equal(12);
        done();
      })
    })

    it("Get 'Haley Reed': Should contain Haley Reed and her video(s)", function (done) {
      this.timeout(15000);

      lansky.star({
        name: "Haley Reed",
        studio: lansky.Site.VIXEN
      })
        .then(result => {
          expect(result)
            .to.be.an("object")
            .to.have.property("videos")
            .that.is.an("array")
            .with.length.greaterThan(0);
          expect(result.videos.map(v => v.title)).to.include("A Perfect Opportunity");
          expect(result)
            .to.have.nested.property("star")
            .that.has.nested.property("name")
            .that.equals("Haley Reed");

          done();
        })
    })

    it("Search 'jia lissa': Should contain 1 star", function (done) {
      this.timeout(15000);

      lansky.search({
        query: "jia lissa",
        studio: lansky.Site.VIXEN
      })
        .then(result => {
          expect(result)
            .to.be.an("object")
            .to.have.property("stars")
            .that.is.an("array")
            .with.length(1);

          expect(result)
            .to.have.nested.property("stars[0]")
            .that.has.nested.property("name")
            .that.equals("Jia Lissa");

          done();
        })
    })

    it("Get scene 'travelling-alone'", function (done) {
      this.timeout(15000);

      lansky.scene("travelling-alone", lansky.Site.VIXEN)
      .then(result => {
        expect(result.video.title).to.equal("Travelling Alone");
        expect(result.video.stars).to.be.an("array").that.includes("Jia Lissa");

        done();
      })
    });

    it("Get null scene", function (done) {
      this.timeout(15000);

      lansky.scene("xyz", lansky.Site.VIXEN)
      .then(result => {
        expect(result.video).to.equal(null);

        done();
      })
    });
  });
})();