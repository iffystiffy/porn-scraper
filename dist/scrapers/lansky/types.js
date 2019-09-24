"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Site;
(function (Site) {
    Site["VIXEN"] = "vixen";
    Site["TUSHY"] = "tushy";
    Site["TUSHY_RAW"] = "tushyraw";
    Site["BLACKED"] = "blacked";
    Site["BLACKED_RAW"] = "blackedraw";
    Site["DEEPER"] = "deeper";
})(Site = exports.Site || (exports.Site = {}));
var Video = /** @class */ (function () {
    function Video(studio, title, id) {
        this.title = null;
        this.stars = null;
        this.description = null;
        this.duration = null;
        this.date = null;
        this.rating = null;
        this.pictures = []; // !TYPE
        this.tags = null;
        this.id = id;
        this.title = title;
        this.studio = studio;
    }
    Video.prototype.getUrl = function () {
        return "https://" + this.studio + ".com/" + this.id;
    };
    return Video;
}());
exports.Video = Video;
;
var Star = /** @class */ (function () {
    function Star(studio, name, id) {
        this.biography = null;
        this.dateOfBirth = null;
        this.rating = null;
        this.nationality = null;
        this.thumbnail = null;
        this.body = {
            cupSize: null,
            bustMeasurement: null,
            waistMeasurement: null,
            hipMeasurement: null,
            hairColor: null
        };
        this.id = id;
        this.name = name;
        this.studio = studio;
    }
    Star.prototype.getUrl = function () {
        return "https://" + this.studio + ".com/" + this.id;
    };
    return Star;
}());
exports.Star = Star;
