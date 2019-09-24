import { expect } from 'chai';
import 'mocha';
import * as iafd from "../../src/scrapers/iafd";

(() => {
  describe(`IAFD`, function () {
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

    it(`iafd.getActor("jane wilde")`, function (done) {
      this.timeout(15000);

      iafd.actor("jane wilde")
        .then(actor => {
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

    it(`iafd.getActor("jane wilde")`, function (done) {
      this.timeout(15000);

      iafd.actor("jane wilde")
        .then(actor => {
          expect(actor)
            .to.be.an("object")
            .to.have.nested.property("stats.piercings")
            .that.is.an("array")
            .that.is.not.empty;

          done();
        })
    });
  });
})();