import { expect } from 'chai';
import 'mocha';
import * as babesource from "../../src/scrapers/babesource/index";

(() => {
  describe("Babesource", function () {

    it("Top rated galleries", function (done) {
      this.timeout(15000);

      babesource.topRated()
      .then(result => {
        expect(result.galleries).to.be.an("array").with.length.greaterThan(0);
        done();
      })
    })

    it("Most viewed galleries", function (done) {
      this.timeout(15000);

      babesource.mostViewed()
      .then(result => {
        expect(result.galleries).to.be.an("array").with.length.greaterThan(0);
        done();
      })
    })

    it("Get gallery", function (done) {
      this.timeout(15000);

      babesource.gallery("kiara-cole-vina-sky-nubile-films-67251")
        .then(result => {
          expect(result.gallery).to.be.not.equal(null);
          expect(result.gallery.stars.map(s => s.name)).to.include("Vina Sky");
          expect(result.gallery.tags).to.include("Threesome");
          expect(result.gallery.images).to.be.an("array").with.length(12);
          expect(result.gallery.getUrl()).to.equal("https://babesource.com/galleries/kiara-cole-vina-sky-nubile-films-67251.html");
          expect(result.related).to.be.an("array").with.length.greaterThan(0);
          done();
        })
    })

    it("Search 'jill kassidy'", function (done) {
      this.timeout(15000);

      babesource.search("jill kassidy")
        .then(result => {
          expect(result.galleries).to.be.an("array").that.is.not.empty;
          done();
        })
    })

    it("Get Jill Kassidy galleries", function (done) {
      this.timeout(15000);

      babesource.star("jill-kassidy-3622")
        .then(result => {
          expect(result.galleries).to.be.an("array").that.has.length.greaterThan(100);
          done();
        })
    })

    it("Get all pornstars", function (done) {
      this.timeout(15000)

      babesource.stars()
        .then(result => {
          expect(result.stars).to.be.an("array").that.has.length.greaterThan(1000);

          const jillKassidy = result.stars.find(i => i.name == "Jill Kassidy");
          expect(jillKassidy).to.not.equal("undefined");
          expect(jillKassidy.id).to.equal("jill-kassidy-3622");
          done();
        })
    })
  })
})();