"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ActorStats = /** @class */ (function () {
    function ActorStats() {
        this.ethnicity = null;
        this.nationality = null;
        this.hairColor = null;
        this.height = null;
        this.weight = null;
        this.measurements = null;
        this.tattoos = null;
        this.piercings = null;
    }
    return ActorStats;
}());
exports.ActorStats = ActorStats;
var Actor = /** @class */ (function () {
    function Actor(name) {
        this.thumbnail = null;
        this.aliases = [];
        this.birthday = null;
        this.birthplace = null;
        this.yearsActive = null;
        this.stats = new ActorStats();
        this.credits = [];
        this.websites = [];
        this.name = name;
    }
    return Actor;
}());
exports.Actor = Actor;
