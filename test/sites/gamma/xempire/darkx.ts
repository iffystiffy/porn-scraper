import { expect } from 'chai';
import 'mocha';
import * as xempire from "../../../../src/scrapers/gamma/xempire/index";
import { Video, Star, Site } from "../../../../src/scrapers/gamma/xempire/types";

(() => {
  describe("DarkX", function () {

    it("Get 'Interracial Teens Vol. 5'", async function() {
      this.timeout(15000);

      const result = await xempire.dvd(Site.DARXK, 76239);
      expect(result.videos.length).to.equal(4);
      expect(result.videos[1].title).to.equal("You Have My Permission");

      expect(result.dvd.title).to.equal("Interracial Teens Vol. 5");
      expect(result.dvd.description).to.include("Starring the stunning, Whitney Wright, blonde beauty, Haley Reed, the adorable, Jessica Rex, and exotic Karly Baker");
      expect(result.dvd.duration).to.equal(8463);
      expect(result.dvd.stars).to.include("Whitney Wright");
      expect(result.dvd.stars).to.include("Haley Reed");
      expect(result.dvd.stars.length).to.be.greaterThan(3);
      expect(result.dvd.frontCover).to.not.equal(null);
      expect(result.dvd.backCover).to.not.equal(null);

      expect(result.stars.length).to.be.greaterThan(3);
      expect(result.stars.map(s => s.name)).to.include("Whitney Wright");
      expect(result.stars.find(s => s.name == "Whitney Wright").id).to.equal(49436);
    })

    it("Search 'anal' DVDs", async function() {
      this.timeout(15000);

      const result = await xempire.searchDvds(Site.DARXK, "anal");
      expect(result.dvds.length).to.be.greaterThan(6);
    })

    it("Search 'emily' stars", async function() {
      this.timeout(15000);

      const result = await xempire.searchStars(Site.DARXK, "emily");
      expect(result.videos.length).to.equal(1);
      expect(result.videos[0].name).to.equal("Emily Willis");
      expect(result.videos[0].id).to.equal(51922);
      expect(result.videos[0].thumbnail).to.not.equal(null);
    })

    it("Get null star page", async function () {
      this.timeout(15000);

      const result = await xempire.star(Site.DARXK,  123);
      expect(result.star).to.equal(null);
      expect(result.videos.length).to.equal(0);
    })

    it("Search 'asasdasdqweqwr' videos", async function () {
      this.timeout(15000);

      const result = await xempire.searchVideos(Site.DARXK, "asasdasdqweqwr");
      expect(result.videos.length).to.equal(0);
    })

    it("Search 'anal' videos, page 4", async function () {
      this.timeout(15000);

      const result = await xempire.searchVideos(Site.DARXK, "anal", 4);
      expect(result.videos.length).to.equal(15);
    })

    it("Search 'anal' videos, page 1", async function () {
      this.timeout(15000);

      const result = await xempire.searchVideos(Site.DARXK, "anal");
      expect(result.videos.length).to.equal(15);
    })

    it("Get Jill Kassidy's page", async function () {
      this.timeout(15000);

      const result = await xempire.star(Site.DARXK,  50684);
      expect(result.star.name).to.equal("Jill Kassidy");
      expect(result.videos.length).to.be.greaterThan(0);
      expect(result.star.thumbnail).to.not.equal(null);
    })

    it("Get frontpage", async function () {
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