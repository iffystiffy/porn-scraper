"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LEGALPORNO_STUDIO_REGEX = /(GG|AB|AF|GP|SZ|IV|GIO|RS|TW|MA|FM|SAL|NR|AA|GL|BZ|FS)\d+/gi;
function extractTitle(originalTitle) {
    var studioMatches = originalTitle.match(LEGALPORNO_STUDIO_REGEX);
    var title = originalTitle;
    for (var _i = 0, studioMatches_1 = studioMatches; _i < studioMatches_1.length; _i++) {
        var match = studioMatches_1[_i];
        if (title.includes(match))
            title = title.replace(match, "");
    }
    if (title.includes("[]"))
        title = title.replace("[]", "");
    return {
        shootIds: studioMatches.map(function (m) { return m.toUpperCase(); }),
        title: title.trim().replace(/  /, " ")
    };
}
exports.extractTitle = extractTitle;
var Video = /** @class */ (function () {
    function Video(id, originalTitle) {
        this.stars = null;
        this.duration = null;
        this.date = null;
        this.thumbnail = null;
        this.tags = null;
        this.id = id;
        var _a = extractTitle(originalTitle), shootIds = _a.shootIds, title = _a.title;
        this.shootIds = shootIds;
        this.title = title;
    }
    Video.prototype.getUrl = function () {
        return "https://legalporno.com/watch/" + this.id;
    };
    return Video;
}());
exports.Video = Video;
var Star = /** @class */ (function () {
    function Star(id, name) {
        this.nationality = null;
        this.age = null;
        this.tags = null;
        this.thumbnail = null;
        this.id = id;
        this.name = name;
    }
    return Star;
}());
exports.Star = Star;
