import { expect } from 'chai';
import 'mocha';
import * as gamma from "../../../../src/scrapers/gamma/xempire/index";
import { Video, Star, Site } from "../../../../src/scrapers/gamma/xempire/types";

(() => {
  describe("DarkX", function () {

    it("Get frontpage", async function() {
      this.timeout(15000);

      const frontpage = await gamma.frontPage(Site.DARXK);
      expect(frontpage.latest).to.have.length.greaterThan(0);
    })

    it("Get scene 149412", async function () {
      this.timeout(15000);

      const data = await gamma.scene(Site.DARXK, 149412);

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