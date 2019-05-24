let scraper = require("./index");

(async () => {
    console.log(await scraper.getVideo({ studio: "tushy", id: "a-very-special-anniversary" }, ));
    console.log(await scraper.search({ query: "anal" }));
    console.log(await scraper.searchStar("Kristen Scott"));
    console.log(await scraper.searchSite({ studio: "tushy", query: "gia derza" }));
    console.log("--- Test completed, you should see a bunch of videos above this message ---");
})();