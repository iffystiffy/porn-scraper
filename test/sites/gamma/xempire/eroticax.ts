import { expect } from 'chai';
import 'mocha';
import * as gamma from "../../../../src/scrapers/gamma/xempire/index";
import { Video, Star, Site } from "../../../../src/scrapers/gamma/xempire/types";

(() => {
  describe("EroticaX", function () {

    it("Get frontpage", async function() {
      this.timeout(15000);

      const frontpage = await gamma.frontPage(Site.EROTICAX);
      expect(frontpage.latest).to.have.length.greaterThan(0);
    })

    it("Get scene 148199", async function () {
      this.timeout(15000);

      const data = await gamma.scene(Site.EROTICAX, 148199);

      expect(data.video).to.not.equal(null);
      expect(data.video.addedOn).to.be.greaterThan(0);
      expect(data.video.description).to.include("And when the champagne starts flowing and inhibitions ebb, a romantic moment ensues.");
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