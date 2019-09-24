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
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var moment = require("moment");
var jsdom_1 = require("jsdom");
var axios_1 = require("axios");
var types_1 = require("./types");
__export(require("./types"));
function scrapeVideoCards(dom) {
    var scenesElements = Array.from(qsAll(dom, '.thumbnails > div'));
    return scenesElements.map(function (element) {
        var sceneLinkElement = element.querySelector('.thumbnail-title a');
        var url = sceneLinkElement.getAttribute("href");
        var originalTitle = sceneLinkElement.textContent.trim();
        var entryId = new URL(url).pathname.split('/')[2];
        var date = moment.utc(element.getAttribute('release'), 'YYYY/MM/DD').toDate().valueOf();
        var video = new types_1.Video(parseInt(entryId), originalTitle);
        video.date = date;
        var imgStyle = element.querySelector(".thumbnail-avatar").getAttribute("style");
        if (imgStyle)
            video.thumbnail = imgStyle.match(/https:.*/)[0];
        return video;
    });
}
function qsAll(dom, query) {
    return dom.window.document.querySelectorAll(query);
}
function qs(dom, query) {
    return dom.window.document.querySelector(query);
}
function scene(id) {
    return __awaiter(this, void 0, void 0, function () {
        var SEARCH_URL, html, dom, originalTitle, date, _a, actorsElement, tagsElement, actors, duration, tags, playerElementStyle, video, err_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    SEARCH_URL = "https://www.legalporno.com/watch/" + id;
                    return [4 /*yield*/, axios_1.default.get(SEARCH_URL)];
                case 1:
                    html = (_b.sent()).data;
                    dom = new jsdom_1.JSDOM(html);
                    originalTitle = qs(dom, 'h1.watchpage-title').textContent.trim();
                    date = moment.utc(qs(dom, 'span[title="Release date"] a').textContent, 'YYYY-MM-DD').toDate().valueOf();
                    _a = Array.from(qsAll(dom, '.scene-description__row')), actorsElement = _a[0], tagsElement = _a[1];
                    actors = Array.from(actorsElement.querySelectorAll('a[href*="com/model"]'))
                        .map(function (actorElement) { return actorElement.textContent; });
                    duration = moment.duration(qs(dom, 'span[title="Runtime"]').textContent.trim()).asSeconds();
                    tags = Array.from(tagsElement.querySelectorAll("a"))
                        .map(function (tagElement) { return tagElement.textContent; });
                    playerElementStyle = qs(dom, "#player").getAttribute("style");
                    video = new types_1.Video(id, originalTitle);
                    video.date = date;
                    video.stars = actors; // !TODO: get actor IDs to access URLs
                    video.duration = duration;
                    video.tags = tags;
                    if (playerElementStyle)
                        video.thumbnail = playerElementStyle.match(/https:.*/)[0];
                    return [2 /*return*/, {
                            searchUrl: SEARCH_URL,
                            video: video,
                            related: scrapeVideoCards(dom)
                        }];
                case 2:
                    err_1 = _b.sent();
                    throw err_1;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.scene = scene;
function scrapeAllCards(page) {
    return __awaiter(this, void 0, void 0, function () {
        var SEARCH_URL, html, dom, videos, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    SEARCH_URL = "https://www.legalporno.com/" + page;
                    return [4 /*yield*/, axios_1.default.get(SEARCH_URL)];
                case 1:
                    html = (_a.sent()).data;
                    dom = new jsdom_1.JSDOM(html);
                    videos = scrapeVideoCards(dom);
                    return [2 /*return*/, {
                            searchUrl: SEARCH_URL,
                            videos: videos
                        }];
                case 2:
                    err_2 = _a.sent();
                    throw err_2;
                case 3: return [2 /*return*/];
            }
        });
    });
}
function search(query) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, scrapeAllCards("search/?query=" + query.toLowerCase().replace(/ /g, "+"))];
        });
    });
}
exports.search = search;
function newest() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, scrapeAllCards("new-videos")];
        });
    });
}
exports.newest = newest;
function recommended() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, scrapeAllCards("recommended")];
        });
    });
}
exports.recommended = recommended;
function bestRecent() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, scrapeAllCards("best-recent-scenes")];
        });
    });
}
exports.bestRecent = bestRecent;
function getStarId(name) {
    return __awaiter(this, void 0, void 0, function () {
        var SEARCH_URL, data, found, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    name = name.trim().toLowerCase();
                    SEARCH_URL = "https://www.legalporno.com/api/autocomplete/search?q=" + name.replace(/ /g, "+");
                    return [4 /*yield*/, axios_1.default.get(SEARCH_URL)];
                case 1:
                    data = (_a.sent()).data;
                    found = data.terms.find(function (obj) { return obj.type == "model" && obj.name.toLowerCase() == name; });
                    return [2 /*return*/, {
                            searchUrl: SEARCH_URL,
                            id: found ? found._id : null
                        }];
                case 2:
                    err_3 = _a.sent();
                    throw err_3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getStarId = getStarId;
function star(id) {
    return __awaiter(this, void 0, void 0, function () {
        var SEARCH_URL, html, dom, name_1, nation, age, tagContainer, thumbnail, tags, star_1, err_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    SEARCH_URL = "https://www.legalporno.com/model/" + id;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, axios_1.default.get(SEARCH_URL)];
                case 2:
                    html = (_a.sent()).data;
                    dom = new jsdom_1.JSDOM(html);
                    name_1 = qs(dom, '.model--description > h2').textContent.trim();
                    nation = qs(dom, '.model--description table tr:nth-child(1) .text-danger').textContent.trim();
                    age = qs(dom, '.model--description table tr:nth-child(2) .text-danger').textContent.trim();
                    tagContainer = qs(dom, '.model--description table tr:nth-child(3)');
                    thumbnail = qs(dom, '.model--avatar > img').getAttribute("src").trim();
                    tags = Array.from(tagContainer.querySelectorAll("a"))
                        .map(function (tagElement) { return tagElement.textContent.trim(); });
                    star_1 = new types_1.Star(id, name_1);
                    star_1.name = name_1;
                    star_1.nationality = nation || null;
                    star_1.age = parseInt(age) || null;
                    star_1.tags = tags || null;
                    star_1.thumbnail = thumbnail;
                    return [2 /*return*/, {
                            searchUrl: SEARCH_URL,
                            star: star_1
                        }];
                case 3:
                    err_4 = _a.sent();
                    if (err_4.response.status == 404) {
                        return [2 /*return*/, {
                                searchUrl: SEARCH_URL,
                                star: null
                            }];
                    }
                    else
                        throw err_4;
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.star = star;
