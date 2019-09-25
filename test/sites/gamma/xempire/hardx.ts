import { expect } from 'chai';
import 'mocha';
import * as gamma from "../../../../src/scrapers/gamma/xempire/index";
import { Video, Star, Site } from "../../../../src/scrapers/gamma/xempire/types";

(() => {
  describe("HardX", function () {

    it("Get frontpage", async function() {
      this.timeout(15000);

      const frontpage = await gamma.frontPage(Site.HARDX);
      expect(frontpage.latest).to.have.length.greaterThan(0);
    })

    it("Get scene 166893", async function () {
      this.timeout(15000);

      const data = await gamma.scene(Site.HARDX, 166893);

      expect(data.video).to.not.equal(null);
      expect(data.video.addedOn).to.be.greaterThan(0);
      expect(data.video.date).to.be.greaterThan(0);
      expect(data.video.description).to.have.include("Lexi Lore is ready for intense double penetration, hardcore gonzo style.")
      expect(data.video.title).to.equal("Super Cute DP");
      expect(data.video.stars).to.include("Lexi Lore");
      expect(data.video.thumbnail).to.not.equal(null);

      expect(data.related.length).to.be.greaterThan(0);

      expect(data.video.getUrl()).to.equal(`https://www.hardx.com/en/video/scene/166893`)

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