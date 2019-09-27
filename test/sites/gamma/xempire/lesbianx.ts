import { expect } from 'chai';
import 'mocha';
import * as xempire from "../../../../src/scrapers/gamma/xempire/index";
import { Video, Star, Site } from "../../../../src/scrapers/gamma/xempire/types";

(() => {
  describe("LesbianX", function () {

    it("Search 'brunette' videos, page 2", async function() {
      this.timeout(15000);

      const result = await xempire.searchVideos(Site.LESBIANX, "brunette", 2);
      expect(result.videos.length).to.greaterThan(0);
    })

    it("Search 'brunette' videos, page 1", async function() {
      this.timeout(15000);

      const result = await xempire.searchVideos(Site.LESBIANX, "brunette");
      expect(result.videos.length).to.equal(15);
    })

    it("Get Whitney Wright's page", async function () {
      this.timeout(15000);

      const result = await xempire.star(Site.LESBIANX, "Whitney Wright", 49436);
      expect(result.star.name).to.equal("Whitney Wright");
      expect(result.videos.length).to.be.greaterThan(3);
      expect(result.star.thumbnail).to.not.equal(null);
    })

    it("Get frontpage", async function() {
      this.timeout(15000);

      const frontpage = await xempire.frontPage(Site.LESBIANX);
      expect(frontpage.latest.length).to.equal(8);
      expect(frontpage.mostViewedStars.length).to.equal(16);
    })

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