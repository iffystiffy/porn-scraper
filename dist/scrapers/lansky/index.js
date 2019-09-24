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
var types_1 = require("./types");
var axios_1 = require("axios");
__export(require("./types"));
function getVideo(video, studio) {
    var vid = new types_1.Video(studio, video.title ? video.title.trim() : null, video.targetUrl.replace("/", ""));
    vid.date = new Date(video.releaseDate).valueOf() || null;
    vid.duration = video.runLengthForDisplay || null;
    vid.rating = parseFloat(video.textRating) || null;
    vid.stars = video.models ? video.models : video.modelsSpaced.split("&").map(function (i) { return i.trim(); });
    vid.pictures = video.images.poster.slice();
    vid.tags = video.tags || null;
    return vid;
}
function getStar(star, studio) {
    var createdStar = new types_1.Star(studio, star.name, star.id);
    createdStar.dateOfBirth = new Date(star.dateOfBirth).valueOf() || null;
    createdStar.biography = star.biography || null;
    createdStar.nationality = star.nationality || null;
    createdStar.rating = parseFloat(star.textRating) || null;
    createdStar.thumbnail = star.cdnUrl || null;
    createdStar.pictures = star.images;
    createdStar.body.cupSize = star.cupSize || null;
    createdStar.body.bustMeasurement = star.bustMeasurment || null;
    createdStar.body.waistMeasurement = star.waistMeasurment || null;
    createdStar.body.hipMeasurement = star.hipMeasurment || null;
    createdStar.body.hairColor = star.hairColour || null;
    return createdStar;
}
function getJSONFromScriptTag(str) {
    var jsonMatch = str.match(/{.*};/);
    var brackets = 0;
    var lastIndex = 0;
    for (var i = 0; i < jsonMatch[0].length; i++) {
        var char = jsonMatch[0].charAt(i);
        if (char == "{")
            brackets++;
        else if (char == "}")
            brackets--;
        if (brackets == 0) {
            lastIndex = i + 1;
            break;
        }
    }
    return JSON.parse(jsonMatch[0].substring(0, lastIndex));
}
function parseVideosAndStars(obj, studio) {
    var videos = obj.videos;
    var stars = obj.models;
    var parsedVideos = videos.map(function (video) { return getVideo(video, studio); });
    var parsedStars = stars.map(function (star) { return getStar(star, studio); });
    return {
        videos: parsedVideos,
        stars: parsedStars
    };
}
exports.parseVideosAndStars = parseVideosAndStars;
function search(options) {
    return __awaiter(this, void 0, void 0, function () {
        var SEARCH_URL, html, scripts, parsed, _a, videos, stars, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    if (!options.studio.length)
                        throw "Invalid studio";
                    if (!options.query.length)
                        throw "Invalid query";
                    SEARCH_URL = "https://" + options.studio + ".com/search?q=" + options.query;
                    return [4 /*yield*/, axios_1.default.get(SEARCH_URL)];
                case 1:
                    html = (_b.sent()).data;
                    scripts = html.match(/(<|%3C)script[\s\S]*?(>|%3E)[\s\S]*?(<|%3C)(\/|%2F)script[\s\S]*?(>|%3E)/gi);
                    parsed = getJSONFromScriptTag(scripts[1]);
                    _a = parseVideosAndStars(parsed, options.studio), videos = _a.videos, stars = _a.stars;
                    return [2 /*return*/, {
                            searchUrl: SEARCH_URL.replace(/ /g, "+"),
                            videos: videos,
                            stars: stars
                        }];
                case 2:
                    error_1 = _b.sent();
                    throw error_1;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.search = search;
function star(options) {
    return __awaiter(this, void 0, void 0, function () {
        var SEARCH_URL, html, scripts, parsed, _a, videos, stars, error_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    if (!options.studio.length)
                        throw "Invalid studio";
                    if (!options.name.length)
                        throw "Invalid name";
                    SEARCH_URL = "https://" + options.studio + ".com/" + options.name.replace(/ /g, "-");
                    return [4 /*yield*/, axios_1.default.get(SEARCH_URL)];
                case 1:
                    html = (_b.sent()).data;
                    scripts = html.match(/(<|%3C)script[\s\S]*?(>|%3E)[\s\S]*?(<|%3C)(\/|%2F)script[\s\S]*?(>|%3E)/gi);
                    parsed = getJSONFromScriptTag(scripts[1]);
                    _a = parseVideosAndStars(parsed, options.studio), videos = _a.videos, stars = _a.stars;
                    return [2 /*return*/, {
                            searchUrl: SEARCH_URL.replace(/ /g, "+"),
                            videos: videos,
                            star: stars[0]
                        }];
                case 2:
                    error_2 = _b.sent();
                    throw error_2;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.star = star;
function frontPage(studio) {
    return __awaiter(this, void 0, void 0, function () {
        var SEARCH_URL, html, scripts, parsed_1, stars, newest, popular, latest, upcoming, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    if (!studio.length)
                        throw "Invalid studio";
                    SEARCH_URL = "https://" + studio + ".com";
                    return [4 /*yield*/, axios_1.default.get(SEARCH_URL)];
                case 1:
                    html = (_a.sent()).data;
                    scripts = html.match(/(<|%3C)script[\s\S]*?(>|%3E)[\s\S]*?(<|%3C)(\/|%2F)script[\s\S]*?(>|%3E)/gi);
                    parsed_1 = getJSONFromScriptTag(scripts[1]);
                    stars = parseVideosAndStars(parsed_1, studio).stars;
                    newest = getVideo(parsed_1.videos.find(function (v) { return v.newId == parsed_1.page.data["/"].data.newestRelease.newId; }), studio);
                    popular = parsed_1.page.data["/"].data.popularVideos
                        .map(function (id) { return parsed_1.videos.find(function (v) { return v.newId == id; }); })
                        .map(function (v) { return getVideo(v, studio); });
                    latest = parsed_1.page.data["/"].data.videos
                        .map(function (id) { return parsed_1.videos.find(function (v) { return v.newId == id; }); })
                        .map(function (v) { return getVideo(v, studio); });
                    upcoming = null;
                    try {
                        upcoming = getVideo(parsed_1.page.data["/"].data.nextScene, studio);
                    }
                    catch (err) { }
                    return [2 /*return*/, {
                            newest: newest,
                            popular: popular,
                            // !TODO featured?
                            latest: latest,
                            stars: stars,
                            upcoming: upcoming
                        }];
                case 2:
                    error_3 = _a.sent();
                    throw error_3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.frontPage = frontPage;
