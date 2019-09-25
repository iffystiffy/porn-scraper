import { expect } from 'chai';
import 'mocha';
import * as lansky from "../../../src/scrapers/lansky/index";

(() => {
  describe("Tushy Raw", function () {

    it("Get frontpage", function (done) {
      this.timeout(15000);

      lansky.frontPage(lansky.Site.TUSHY_RAW)
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

      lansky.stars(lansky.Site.TUSHY_RAW)
      .then(result => {
        expect(result.stars.length).to.equal(18);
        done();
      })
    })

    it("Get top rated videos page 10000", function (done) {
      this.timeout(15000);

      lansky.topRated(lansky.Site.TUSHY_RAW, 10000)
      .then(result => {
        expect(result.videos.length).to.equal(0);
        done();
      })
    })

    it("Get top rated videos page 1", function (done) {
      this.timeout(15000);

      lansky.topRated(lansky.Site.TUSHY_RAW)
      .then(result => {
        expect(result.videos.length).to.equal(12);
        done();
      })
    })

    it("Get latest videos page 1", function (done) {
      this.timeout(15000);

      lansky.latest(lansky.Site.TUSHY_RAW)
      .then(result => {
        expect(result.videos.length).to.equal(12);
        done();
      })
    })

    it("Get 'Emily Willis': Should contain Emily Willis and her video(s)", function (done) {
      this.timeout(15000);

      lansky.star({
        name: "Emily Willis",
        studio: lansky.Site.TUSHY_RAW
      })
        .then(result => {
          expect(result)
            .to.be.an("object")
            .to.have.property("videos")
            .that.is.an("array")
            .with.length(1);
          expect(result.videos[0].title).to.equal("New Comfort Zone");
          expect(result.videos[0].id).to.equal("new-comfort-zone");
          expect(result.videos[0].tags).to.not.be.empty;
          expect(result)
            .to.have.nested.property("star")
            .that.has.nested.property("name")
            .that.equals("Emily Willis");

          done();
        })
    })

    it("Search 'Jaye': Should contain Jaye Summers in search results", function (done) {
      this.timeout(15000);

      lansky.search({
        query: "Jaye",
        studio: lansky.Site.TUSHY_RAW
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
            .that.equals("Jaye Summers");

          const jaye = result.stars[0] as lansky.Star;
          expect(jaye.getUrl()).to.equal("https://tushyraw.com/jaye-summers");

          done();
        })
    })

    it("Get scene 'bounce-bounce'", function (done) {
      this.timeout(15000);

      lansky.scene("bounce-bounce", lansky.Site.TUSHY_RAW)
      .then(result => {
        expect(result.video.title).to.equal("Bounce Bounce");
        expect(result.video.stars).to.be.an("array").that.includes("Gabbie Carter");

        done();
      })
    });

    it("Get null scene", function (done) {
      this.timeout(15000);

      lansky.scene("xyz", lansky.Site.TUSHY_RAW)
      .then(result => {
        expect(result.video).to.equal(null);

        done();
      })
    });
  });
})();