import { expect } from 'chai';
import 'mocha';
import * as xempire from "../../../../src/scrapers/gamma/xempire/index";
import { Video, Star, Site } from "../../../../src/scrapers/gamma/xempire/types";

(() => {
  describe("DarkX", function () {

    it("Search 'anal' videos, page 4", async function() {
      this.timeout(15000);

      const result = await xempire.searchVideos(Site.DARXK, "anal", 4);
      expect(result.videos.length).to.equal(15);
    })

    it("Search 'anal' videos, page 1", async function() {
      this.timeout(15000);

      const result = await xempire.searchVideos(Site.DARXK, "anal");
      expect(result.videos.length).to.equal(15);
    })

    it("Get Jill Kassidy's page", async function () {
      this.timeout(15000);

      const result = await xempire.star(Site.DARXK, "Jill Kassidy", 50684);
      expect(result.star.name).to.equal("Jill Kassidy");
      expect(result.videos.length).to.be.greaterThan(0);
      expect(result.star.thumbnail).to.not.equal(null);
    })

    it("Get frontpage", async function() {
      this.timeout(15000);

      const frontpage = await xempire.frontPage(Site.DARXK);
      expect(frontpage.latest.length).to.equal(8);
      expect(frontpage.mostViewedStars.length).to.equal(16);
    })

    it("Get scene 149412", async function () {
      this.timeout(15000);

      const data = await xempire.scene(Site.DARXK, 149412);

      expect(data.video).to.not.equal(null);
      expect(data.video.addedOn).to.be.greaterThan(0);
      expect(data.video.description).to.have.length.greaterThan(0);
      expect(data.video.title).to.equal("Jill Kassidy Goes Black");
      expect(data.video.stars).to.include("Jill Kassidy");
      expect(data.video.thumbnail).to.not.equal(null);
      expect(data.video.description).to.include("Gorgeous Superstar, Jill Kassidy");

      const tags = [
        "Hardcore",
        "Cumshot",
        "Facial",
        "Brunette",
        "Petite",
        "Blowjob",
        "Cum Swallowing",
        "Small Tits",
        "Gonzo",
        "Black"
      ]

      for (const tag of tags) {
        expect(data.video.tags).to.include(tag);
      }
    })
  })
})();