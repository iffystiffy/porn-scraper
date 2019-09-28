import { expect } from 'chai';
import 'mocha';
import * as julesjordan from "../../src/scrapers/julesjordan/index";

(() => {
  describe("Jules Jordan", function () {

    it("Get scene", function (done) {
      this.timeout(15000);

      julesjordan.scene("Mandy-Muse-Gape-Anal-Interracial-Big-Black-Cock-Big-Booty-Big-Ass_vids")
        .then(result => {

          expect(result.video.title).to.equal("Dredd's BBC Opens Up Mandy Muse's Tight Asshole");
          expect(result.video.description).to.include("Mandy is a big booty slut that loves BBC");
          expect(result.video.thumbnail).to.not.equal(null);
          expect(result.video.tags).to.deep.equal([
            '4K',
            'Anal',
            'Ass To Mouth',
            'Big Butts',
            'Big Cocks',
            'Black',
            'Blowjobs',
            'Brunettes',
            'Deep Throat',
            'Facial',
            'Interracial',
            'Lingerie'
          ]);
          expect(result.video.stars).to.include("Mandy Muse");
          expect(result.video.getUrl()).to.equal("https://www.julesjordan.com/trial/scenes/Mandy-Muse-Gape-Anal-Interracial-Big-Black-Cock-Big-Booty-Big-Ass_vids.html");

          done();
        })
    })
  })
})();