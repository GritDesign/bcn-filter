
var events = require("events");
var util = require("util");
var assert = require("assert");

function BcnFilter(iterator, filterFunction) {
    var self = this;
    events.EventEmitter.call(self);

    self._iterator = iterator;

    if (typeof(filterFunction) !== 'function') {
        throw new Error("filterFunction must be provided.  It should take arguments (key, value) which are strings and return [key, value] or null");
    }

    var index = 0;

    iterator.on("data", function(index, key, value) {
        var new_data = filterFunction(key, value);

        if (new_data) {
            self.emit("data", index, new_data[0], new_data[1]);
            index++;
        }
    });

    iterator.on("end", function() {
        self.emit("end");
    });
}

util.inherits(BcnFilter, events.EventEmitter);

BcnFilter.prototype.pause = function() {
    self._iterator.pause();
}

BcnFilter.prototype.resume = function() {
    self._iterator.resume();
}

exports.BcnFilter = BcnFilter;
