import { expect } from 'chai';
import 'mocha';
import * as xempire from "../../../src/scrapers/xempire/index";
import { Video, Star, Site } from "../../../src/scrapers/xempire/types";

(() => {
  describe("HardX", function () {

    it("Get scene 166893", async function () {
      this.timeout(15000);

      const data = await xempire.scene(Site.HARDX, 166893);

      expect(data.video).to.not.equal(null);
      expect(data.video.addedOn).to.be.greaterThan(0);
      expect(data.video.description).to.have.length.greaterThan(0);
      expect(data.video.title).to.equal("Super Cute DP");
      expect(data.video.stars).to.include("Lexi Lore");
      expect(data.video.thumbnail).to.not.equal(null);

      const tags = [
        "Hardcore",
        "Blowjob (Double)",
        "Facial", "Blonde",
        "Blowjob",
        "Cum Swallowing",
        "Anal",
        "Butt Plug",
        "Deepthroat",
        "Threesome"
      ]

      for (const tag of tags) {
        expect(data.video.tags).to.include(tag);
      }
    })
  })
})();