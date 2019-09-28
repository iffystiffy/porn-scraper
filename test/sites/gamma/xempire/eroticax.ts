import { expect } from 'chai';
import 'mocha';
import * as xempire from "../../../../src/scrapers/gamma/xempire/index";
import { Video, Star, Site } from "../../../../src/scrapers/gamma/xempire/types";

(() => {
  describe("EroticaX", function () {

    it("Get 'Internal Love Vol. 5'", async function() {
      this.timeout(15000);

      const result = await xempire.dvd(Site.EROTICAX, 76146);
      expect(result.videos.length).to.equal(4);
      expect(result.videos[3].title).to.equal("Forbidden Fruit");

      expect(result.dvd.title).to.equal("Internal Love Vol. 5");
      expect(result.dvd.description).to.include("Four stories of the most intimate moments between couples are presented");
      expect(result.dvd.duration).to.equal(7812);
      expect(result.dvd.stars).to.include("Emma Starletto");
      expect(result.dvd.stars).to.include("Gianna Dior");
      expect(result.dvd.stars.length).to.be.greaterThan(3);
      expect(result.dvd.frontCover).to.not.equal(null);
      expect(result.dvd.backCover).to.not.equal(null);

      expect(result.stars.length).to.be.greaterThan(3);
      expect(result.stars.map(s => s.name)).to.include("Emma Starletto");
      expect(result.stars.find(s => s.name == "Emma Starletto").id).to.equal(57662);
    })

    it("Search 'anal' DVDs", async function() {
      this.timeout(15000);

      const result = await xempire.searchDvds(Site.EROTICAX, "anal");
      expect(result.dvds.length).to.be.greaterThan(0);
    })
    
    it("Search 'emily' stars", async function() {
      this.timeout(15000);

      const result = await xempire.searchStars(Site.EROTICAX, "emily");
      expect(result.videos.length).to.equal(1);
      expect(result.videos[0].name).to.equal("Emily Willis");
      expect(result.videos[0].id).to.equal(51922);
      expect(result.videos[0].thumbnail).to.not.equal(null);
    })

    it("Get null star page", async function () {
      this.timeout(15000);

      const result = await xempire.star(Site.EROTICAX,  123);
      expect(result.star).to.equal(null);
      expect(result.videos.length).to.equal(0);
    })

    it("Search 'asasdasdqweqwr' videos", async function () {
      this.timeout(15000);

      const result = await xempire.searchVideos(Site.EROTICAX, "asasdasdqweqwr");
      expect(result.videos.length).to.equal(0);
    })

    it("Search 'blonde' videos, page 2", async function () {
      this.timeout(15000);

      const result = await xempire.searchVideos(Site.EROTICAX, "blonde", 2);
      expect(result.videos.length).to.equal(15);
    })

    it("Search 'blonde' videos, page 1", async function () {
      this.timeout(15000);

      const result = await xempire.searchVideos(Site.EROTICAX, "blonde");
      expect(result.videos.length).to.equal(15);
    })

    it("Get Marley Brinx's page", async function () {
      this.timeout(15000);

      const result = await xempire.star(Site.EROTICAX, 36247);
      expect(result.star.name).to.equal("Marley Brinx");
      expect(result.videos.length).to.be.greaterThan(1);
      expect(result.star.thumbnail).to.not.equal(null);
    })

    it("Get frontpage", async function () {
      this.timeout(15000);

      const frontpage = await xempire.frontPage(Site.EROTICAX);
      expect(frontpage.latest.length).to.equal(8);
      expect(frontpage.mostViewedStars.length).to.equal(16);
    })

    it("Get scene 148199", async function () {
      this.timeout(15000);

      const data = await xempire.scene(Site.EROTICAX, 148199);

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