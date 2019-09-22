import * as iafd from "../src/scrapers/iafd";
import * as lansky from "../src/scrapers/lansky/index";

(async () => {
  /*console.log(await iafd.getStar("http://www.iafd.com/person.rme/perfid=charlottesartre/gender=f/charlotte-sartre.htm"));*/

  /* const actor = new lib.Actor("adria rae");
  await actor.info(); */
})();

import { expect } from 'chai';
import 'mocha';

describe("Search Tushy", function() {
  it("Search 'Kristen Scott': Should contain 3 videos", function(done) {
    this.timeout(15000);

    lansky.searchSite({
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

describe("Search Blacked", function() {
  it("Search 'Zoey Laine': Should contain 2 stars (Zoey Laine, Zoey Monroe)", function(done) {
    this.timeout(15000);

    lansky.searchSite({
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

describe("Search Tushy Raw", function() {
  it("Search 'Jaye': Should contain Jaye Summers", function(done) {
    this.timeout(15000);

    lansky.searchSite({
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
});

/* describe(`Search IAFD`, function () {
  it(`Search 'adria rae': Should contain only Adria Rae in femaleStars`, function (done) {
    this.timeout(15000);
    iafd.search("adria rae")
      .then(result => {
        expect(result)
          .to.be.an("object")
          .to.have.nested.property("femaleStars[0].name")
          .that.equals("Adria Rae")

          done();
      })
  });

  it(`Search 'dellai': Should contain 2 stars in femaleStars`, function (done) {
    this.timeout(15000);
    iafd.search("dellai")
      .then(result => {
        expect(result)
          .to.be.an("object")
          .to.have.nested.property("femaleStars")
          .that.is.an("array")
          .with.length(2)

          done();
      })
  });

  it(`Search 'asdkaosdjoasrj': Should contain 0 results`, function (done) {
    this.timeout(15000);
    iafd.search("asdkaosdjoasrj")
      .then(result => {
        expect(result)
          .to.be.an("object")
          .to.have.nested.property("femaleStars")
          .that.is.an("array")
          .with.length(0)

          done();
      })
  });

  it(`iafd.actor('jane wilde')`, function (done) {
    this.timeout(15000);

    const actor = iafd.actor("jane wilde");
    actor.info()
      .then(() => {
        expect(actor)
          .to.be.an("object")
          .to.have.nested.property("stats.ethnicity")
          .that.is.a("string")
          .that.equals("Caucasian")

        expect(actor)
          .to.be.an("object")
          .to.have.nested.property("stats.tattoos")
          .that.is.an("array")
          .that.is.not.empty;

        expect(actor)
          .to.be.an("object")
          .to.have.nested.property("stats.hairColor")
          .that.includes("Blond")

          done();
      })
  });

  it(`iafd.actor('arietta adams'):`, function (done) {
    this.timeout(15000);

    const actor = iafd.actor("arietta adams");
    actor.info()
      .then(() => {
        expect(actor)
          .to.be.an("object")
          .to.have.nested.property("stats.piercings")
          .that.is.an("array")
          .that.is.not.empty;

          done();
      })
  });
}); */