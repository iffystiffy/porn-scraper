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
var jsdom_1 = require("jsdom");
var axios_1 = require("axios");
var iafd = require("./types");
var IAFD_SEARCH_TEMPLATE = "http://www.iafd.com/results.asp?searchtype=comprehensive&searchstring=";
// !TODO
function extractHeight(str) {
    return {
        imperial: {
            feet: 0,
            inches: 0
        },
        metric: 100
    };
}
// !TODO
function extractWeight(str) {
    return {
        imperial: 0,
        metric: 100
    };
}
function actor(name) {
    return new iafd.Actor(name);
}
exports.actor = actor;
function search(query) {
    var _this = this;
    return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
        var res, dom, femaleStarAnchors, femaleStars_1, scenes, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1.default.get(IAFD_SEARCH_TEMPLATE + query.split(" ").join("+"))];
                case 1:
                    res = _a.sent();
                    dom = new jsdom_1.JSDOM(res.data);
                    femaleStarAnchors = dom.window.document.querySelectorAll("#tblFem tbody tr a");
                    femaleStars_1 = [];
                    femaleStarAnchors.forEach(function (anchor) {
                        if (anchor.textContent.length)
                            femaleStars_1.push({
                                name: anchor.textContent,
                                url: "http://www.iafd.com" + anchor.getAttribute("href")
                            });
                    });
                    scenes = [];
                    resolve({
                        femaleStars: femaleStars_1,
                        scenes: scenes
                    });
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    reject(err_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
}
exports.search = search;
function getStar(url) {
    var _this = this;
    return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
        var res, dom, name_1, actor_1, aliases, birthday, birthplace, yearsActiveText, yearsActiveRange, currentYear, websites, stats, perfBox, ethnicity, nationality, hairColor, height, weight, measurements, tattoos, tattoosText, piercings, piercingsText, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1.default.get(url)];
                case 1:
                    res = _a.sent();
                    dom = new jsdom_1.JSDOM(res.data);
                    name_1 = dom.window.document.querySelector("h1").textContent;
                    actor_1 = new iafd.Actor(name_1.trim());
                    actor_1.thumbnail = dom.window.document.querySelector("#headshot img").getAttribute("src");
                    aliases = dom.window.document.querySelectorAll(".biodata")["0"].textContent.split(",").map(function (s) { return s.trim(); });
                    birthday = dom.window.document.querySelectorAll(".biodata")["1"].textContent.trim();
                    birthplace = dom.window.document.querySelectorAll(".biodata")["3"].textContent.trim();
                    actor_1.aliases = aliases;
                    actor_1.birthday = birthday;
                    actor_1.birthplace = birthplace;
                    yearsActiveText = dom.window.document.querySelectorAll(".biodata")["4"].textContent.trim();
                    yearsActiveRange = yearsActiveText.match(/[0-9]+-[0-9]+/)[0].split("-").map(function (s) { return parseInt(s); });
                    currentYear = new Date().getFullYear();
                    actor_1.yearsActive = {
                        start: yearsActiveRange[0],
                        end: yearsActiveRange[1] === currentYear ? null : yearsActiveRange[1]
                    };
                    websites = dom.window.document.querySelector(".col-xs-12.col-sm-3").querySelectorAll("a");
                    websites.forEach(function (anchor) {
                        if (anchor.textContent.length && anchor.textContent.includes("http"))
                            actor_1.websites.push(anchor.textContent.trim());
                    });
                    stats = new iafd.ActorStats();
                    perfBox = dom.window.document.querySelector("#perfbox");
                    ethnicity = perfBox.querySelectorAll(".biodata")["0"].textContent.trim();
                    nationality = perfBox.querySelectorAll(".biodata")["1"].textContent.trim();
                    hairColor = perfBox.querySelectorAll(".biodata")["2"].textContent.trim();
                    height = perfBox.querySelectorAll(".biodata")["3"].textContent.trim();
                    weight = perfBox.querySelectorAll(".biodata")["4"].textContent.trim();
                    measurements = perfBox.querySelectorAll(".biodata")["5"].textContent.trim();
                    height = extractHeight(height);
                    weight = extractWeight(weight);
                    tattoos = null;
                    tattoosText = perfBox.querySelectorAll(".biodata")["6"].textContent;
                    if (tattoosText.toLowerCase() === "none")
                        tattoos = [];
                    else if (tattoosText.toLowerCase() !== "no data")
                        tattoos = tattoosText.split(";").map(function (s) { return s.trim(); });
                    piercings = null;
                    piercingsText = perfBox.querySelectorAll(".biodata")["7"].textContent;
                    if (piercingsText.toLowerCase() === "none")
                        piercings = [];
                    else if (piercingsText.toLowerCase() !== "no data")
                        piercings = piercingsText.split(";").map(function (s) { return s.trim(); });
                    stats.ethnicity = ethnicity;
                    stats.nationality = nationality;
                    stats.hairColor = hairColor;
                    stats.height = height;
                    stats.weight = weight;
                    stats.measurements = measurements;
                    stats.tattoos = tattoos;
                    stats.piercings = piercings;
                    actor_1.stats = stats;
                    resolve(actor_1);
                    return [3 /*break*/, 3];
                case 2:
                    err_2 = _a.sent();
                    reject(err_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
}
exports.getStar = getStar;
