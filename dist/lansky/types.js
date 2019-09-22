"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LanskySite;
(function (LanskySite) {
    LanskySite["VIXEN"] = "vixen";
    LanskySite["TUSHY"] = "tushy";
    LanskySite["TUSHY_RAW"] = "tushyraw";
    LanskySite["BLACKED"] = "blacked";
    LanskySite["BLACKED_RAW"] = "blackedraw";
    LanskySite["DEEPER"] = "deeper";
})(LanskySite = exports.LanskySite || (exports.LanskySite = {}));
var Video = /** @class */ (function () {
    function Video(studio, id) {
        this.title = null;
        this.description = null;
        this.duration = null;
        this.date = null;
        this.rating = null;
        this.pictures = [];
        this.id = id;
        this.studio = studio;
    }
    return Video;
}());
exports.Video = Video;
;
var ListingItem = /** @class */ (function () {
    function ListingItem(id) {
        this.title = null;
        this.stars = [];
        this.rating = null;
        this.thumbnail = null;
        this.studio = null;
        this.id = id;
    }
    return ListingItem;
}());
exports.ListingItem = ListingItem;
;
