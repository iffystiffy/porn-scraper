import { expect } from 'chai';
import 'mocha';
import * as xempire from "../../../../src/scrapers/gamma/xempire/index";
import { Video, Star, Site } from "../../../../src/scrapers/gamma/xempire/types";

(() => {
  describe("HardX", function () {

    it("Search 'anal' DVDs", async function() {
      this.timeout(15000);

      const result = await xempire.searchDvds(Site.HARDX, "anal");
      expect(result.dvds.length).to.equal(24);
    })

    it("Search 'emily' stars", async function() {
      this.timeout(15000);

      const result = await xempire.searchStars(Site.HARDX, "emily");
      expect(result.videos.length).to.equal(1);
      expect(result.videos[0].name).to.equal("Emily Willis");
      expect(result.videos[0].id).to.equal(51922);
      expect(result.videos[0].thumbnail).to.not.equal(null);
    })

    it("Get null star page", async function () {
      this.timeout(15000);

      const result = await xempire.star(Site.HARDX,  123);
      expect(result.star).to.equal(null);
      expect(result.videos.length).to.equal(0);
    })

    it("Search 'asasdasdqweqwr' videos", async function() {
      this.timeout(15000);

      const result = await xempire.searchVideos(Site.HARDX, "asasdasdqweqwr");
      expect(result.videos.length).to.equal(0);
    })

    it("Search 'anal' videos, page 5", async function() {
      this.timeout(15000);

      const result = await xempire.searchVideos(Site.HARDX, "anal", 5);
      expect(result.videos.length).to.equal(15);
    })

    it("Search 'anal' videos, page 1", async function() {
      this.timeout(15000);

      const result = await xempire.searchVideos(Site.HARDX, "anal");
      expect(result.videos.length).to.equal(15);
    })

    it("Get Lexi Lore's page", async function () {
      this.timeout(15000);

      const result = await xempire.star(Site.HARDX, 53220);
      expect(result.star.name).to.equal("Lexi Lore");
      expect(result.videos.length).to.be.greaterThan(1);
      expect(result.star.thumbnail).to.not.equal(null);
    })

    it("Get frontpage", async function () {
      this.timeout(15000);

      const frontpage = await xempire.frontPage(Site.HARDX);
      expect(frontpage.latest.length).to.equal(8);
      expect(frontpage.mostViewedStars.length).to.equal(16);
    })

    it("Get scene 166893", async function () {
      this.timeout(15000);

      const data = await xempire.scene(Site.HARDX, 166893);

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