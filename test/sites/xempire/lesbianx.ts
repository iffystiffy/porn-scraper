import { expect } from 'chai';
import 'mocha';
import * as xempire from "../../../src/scrapers/xempire/index";
import { Video, Star, Site } from "../../../src/scrapers/xempire/types";

(() => {
  describe("LesbianX", function () {

    it("Get scene 148033", async function () {
      this.timeout(15000);

      const data = await xempire.scene(Site.LESBIANX, 148033);

      expect(data.video).to.not.equal(null);
      expect(data.video.addedOn).to.be.greaterThan(0);
      expect(data.video.description).to.have.length.greaterThan(0);
      expect(data.video.title).to.equal("Extreme Anal Strap-On");
      expect(data.video.stars).to.include("Gia Derza");
      expect(data.video.thumbnail).to.not.equal(null);
      expect(data.video.description).to.include("Gia Derza and Whitney Wright are craving lesbian anal. This is big booty anal strap-on with two of the hottest lesbians!");

      const tags = [
        "Hardcore",
        "Brunette",
        "Toys",
        "Dildo",
        "Small Tits",
        "Anal",
        "Girl-on-Girl",
        "Strap-on",
        "Gonzo",
        "Ass To Mouth"
      ]

      for (const tag of tags) {
        expect(data.video.tags).to.include(tag);
      }
    })
  })
})();