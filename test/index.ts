import * as iafd from "../src/scrapers/iafd";

/* (async () => {
  console.log(await iafd.getStar("http://www.iafd.com/person.rme/perfid=charlottesartre/gender=f/charlotte-sartre.htm"));
})(); */

import { expect } from 'chai';
import 'mocha';

describe(`Search IAFD`, function () {
  it(`Search 'adria rae': Should contain only Adria Rae in femaleStars`, function (done) {
    this.timeout(15000);
    iafd.search("adria rae")
      .then(result => {
        expect(result)
          .to.be.an("object")
          .to.have.nested.property("femaleStars[0].name")
          .that.equals("Adria Rae")
      })
      .finally(() => {
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
      })
      .finally(() => {
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
      })
      .finally(() => {
        done();
      })
  });
});