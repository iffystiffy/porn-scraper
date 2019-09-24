import { expect } from 'chai';
import 'mocha';
import * as legalporno from "../../src/scrapers/legalporno/index";

export default (() => {
  describe("Legalporno", function () {

    it("Star ID", async function (done) {
      const tests = [
        [
          "emily pink",
          5250
        ],
        [
          "Whitney wright",
          4053
        ],
        [
          "LINA LUXA",
          4174
        ],
        [
          "selvaggia",
          3432
        ],
        [
          "selvag",
          null
        ]
      ] as [string, number][];

      for(const test of tests) {
        const id = await legalporno.getStarId(test[0]);
        expect(id).to.equal(test[1]);
      }


      

      done();
    })

    it("extractTitle", function (done) {
      const tests = [
        [
          "Irina Bruni DAP & creampie (2 cocks in ass) gg414 (exclusive)",
          "Irina Bruni DAP & creampie (2 cocks in ass) (exclusive)",
          ["GG414"]
        ],
        [
          "Monica double anal (DP DAP HARDCORE) GG226 (exclusive)",
          "Monica double anal (DP DAP HARDCORE) (exclusive)",
          ["GG226"]
        ],
        [
          "Petite slut Polly Petrova assfucked, DPed & DAPed by two monster cocks [SZ2140] BZ011",
          "Petite slut Polly Petrova assfucked, DPed & DAPed by two monster cocks",
          ["SZ2140", "BZ011"]
        ],
        [
          "Whitney Wright Gets Punished by Two Big Black Cocks AB015",
          "Whitney Wright Gets Punished by Two Big Black Cocks",
          ["AB015"]
        ],
        [
          "Sexy slut Veronica Avluv loves to get stuffed AB021",
          "Sexy slut Veronica Avluv loves to get stuffed",
          ["AB021"]
        ],
        ["Lina Luxa assfucked by 1, 2, 3, 4 guys and then gangbanged by all 10 of them with DP, DAP & cum swallow SZ2284",
          "Lina Luxa assfucked by 1, 2, 3, 4 guys and then gangbanged by all 10 of them with DP, DAP & cum swallow",
          ["SZ2284"]
        ],
        ["You have to see this! Luna Lovely with 4 HUGE cocks taking it like the awesome slut she is AA048",
          "You have to see this! Luna Lovely with 4 HUGE cocks taking it like the awesome slut she is",
          ["AA048"]
        ],
        ["Little Sofi Smile plays with two big cocks AF001",
          "Little Sofi Smile plays with two big cocks",
          ["AF001"]
        ]
      ] as [string, string, string[]][];

      for (const test of tests) {
        const { shootIds, title } = legalporno.extractTitle(test[0]);
        expect(title).to.equal(test[1]);
        expect(shootIds).to.deep.equal(test[2]);
      }

      done();
    })

    it("Get best recent videos", function (done) {
      this.timeout(15000);

      legalporno.bestRecent()
        .then(result => {
          expect(result).to.be.an("array")
            .that.is.not.empty;

          for (const video of result) {
            expect(video.title).to.be.a("string").and.not.be.empty;
            expect(video.shootIds).to.be.an("array").and.not.be.empty;
            expect(video.id).to.be.a("number").and.be.greaterThan(0);
          }

          done();
        })
    })

    it("Get recommended videos", function (done) {
      this.timeout(15000);

      legalporno.recommended()
        .then(result => {
          expect(result).to.be.an("array")
            .that.is.not.empty;

          for (const video of result) {
            expect(video.title).to.be.a("string").and.not.be.empty;
            expect(video.shootIds).to.be.an("array").and.not.be.empty;
            expect(video.id).to.be.a("number").and.be.greaterThan(0);
          }

          done();
        })
    })

    it("Get newest videos", function (done) {
      this.timeout(15000);

      legalporno.newest()
        .then(result => {
          expect(result).to.be.an("array")
            .that.is.not.empty;

          for (const title of result.map(r => r.title)) {
            expect(title).to.be.a("string").and.not.be.empty;
          }

          for (const shootIds of result.map(r => r.shootIds)) {
            expect(shootIds).to.be.an("array").and.not.be.empty;
          }

          for (const id of result.map(r => r.id)) {
            expect(id).to.be.a("number").and.be.greaterThan(0);
          }

          done();
        })
    })

    it("Get scene 56119", function (done) {
      this.timeout(15000);

      legalporno.scene(56119)
        .then(result => {
          expect(result)
            .to.have.nested.property("video")
            .that.has.property("tags")
            .that.includes("gangbang");
          expect(result.video)
            .to.have.property("stars")
            .that.includes("Lina Luxa");
          expect(result.video.getUrl()).to.equal("https://legalporno.com/watch/56119");
          expect(result.video.shootIds).to.deep.equal(["SZ2284"]);
          expect(result.related)
            .to.be.an("array")
            .that.is.not.empty;

          done();
        })
    })
  })
})