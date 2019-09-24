import { expect } from 'chai';
import 'mocha';
import * as xempire from "../../../src/scrapers/xempire/index";
import { Video, Star, Site } from "../../../src/scrapers/xempire/types";

(() => {
  describe("EroticaX", function () {

    it("Get scene 148199", async function () {
      this.timeout(15000);

      const data = await xempire.scene(Site.HARDX, 148199);

      expect(data.video).to.not.equal(null);
      expect(data.video.addedOn).to.be.greaterThan(0);
      expect(data.video.description).to.have.length.greaterThan(0);
      expect(data.video.title).to.equal("Time To Celebrate");
      expect(data.video.stars).to.include("Khloe Kapri");
      expect(data.video.thumbnail).to.not.equal(null);

      const tags = [
        "Cumshot",
        "Fingering",
        "Blonde",
        "Blowjob",
        "Pussy Licking",
        "Shaved"
      ]

      for (const tag of tags) {
        expect(data.video.tags).to.include(tag);
      }
    })
  })
})();