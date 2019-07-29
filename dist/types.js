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
        this.tattoos = [];
        this.piercings = [];
    }
    return ActorStats;
}());
exports.ActorStats = ActorStats;
var Actor = /** @class */ (function () {
    function Actor(name) {
        this.aliases = [];
        this.birthday = null;
        this.birthplace = null;
        this.yearsActive = null;
        this.stats = new ActorStats();
        this.credits = [];
        this.websites = [];
        this.name = name;
    }
    Actor.prototype.info = function () {
    };
    return Actor;
}());
exports.Actor = Actor;
