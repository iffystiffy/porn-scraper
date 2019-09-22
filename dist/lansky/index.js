"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var puppeteer = require("puppeteer");
var asyncPool = require("tiny-async-pool");
var types_1 = require("./types");
function searchSite(options) {
    var _this = this;
    return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
        var browser, page, searchUrl, listing, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!options.studio || !options.studio.length)
                        return [2 /*return*/, reject("Invalid studio")];
                    if (!options.query || !options.query.length)
                        return [2 /*return*/, reject("Invalid query")];
                    browser = options.browser;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 9, , 12]);
                    console.log("Scraping query '" + options.query + ("' from " + options.studio) + "...");
                    if (!!browser) return [3 /*break*/, 3];
                    console.log("Launching new chrome process...");
                    return [4 /*yield*/, puppeteer.launch({ headless: options.debug !== true })];
                case 2:
                    browser = _a.sent();
                    _a.label = 3;
                case 3: return [4 /*yield*/, browser.pages()];
                case 4:
                    page = (_a.sent())[0];
                    searchUrl = "https://" + options.studio + ".com/search?q=" + options.query;
                    return [4 /*yield*/, page.goto(searchUrl, { waitUntil: 'networkidle2' })];
                case 5:
                    _a.sent();
                    listing = [];
                    return [4 /*yield*/, page.evaluate(function () {
                            var videoContainers = Array.from(document.querySelectorAll('[data-test-component="VideoList"] [data-test-component="VideoThumbnailContainer"]'));
                            var listing = videoContainers.map(function (v) {
                                var id = v.getElementsByTagName("a")[0].href.split(".com/")[1];
                                var item = new types_1.ListingItem(id);
                                item.title = v.getElementsByTagName("a")[0].getAttribute("title");
                                item.thumbnail = v.querySelector("[data-test-component=\"ProgressiveImage\"] img").src;
                                item.stars = Array.from(v.querySelectorAll("[data-test-component=\"Overlay\"] a")).map(function (o) {
                                    return o.firstChild.data;
                                });
                                item.rating = null; // todo
                                return item;
                            });
                            return listing;
                        })];
                case 6:
                    listing = _a.sent();
                    listing.forEach(function (video) {
                        video.studio = options.studio;
                    });
                    if (!!options.browser) return [3 /*break*/, 8];
                    console.log("Closing chrome...");
                    return [4 /*yield*/, browser.close()];
                case 7:
                    _a.sent();
                    _a.label = 8;
                case 8:
                    resolve(listing);
                    return [3 /*break*/, 12];
                case 9:
                    err_1 = _a.sent();
                    console.error(err_1);
                    if (!!options.browser) return [3 /*break*/, 11];
                    console.log("Closing chrome...");
                    return [4 /*yield*/, browser.close()];
                case 10:
                    _a.sent();
                    _a.label = 11;
                case 11:
                    reject(err_1);
                    return [3 /*break*/, 12];
                case 12: return [2 /*return*/];
            }
        });
    }); });
}
exports.searchSite = searchSite;
