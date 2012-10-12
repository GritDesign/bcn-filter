
var events = require("events");
var util = require("util");
var assert = require("assert");

function BcnFilter(iterator, filterFunction, options) {
    var self = this;
    events.EventEmitter.call(self);

    options = options || {async: false};

    self._iterator = iterator;

    if (typeof(filterFunction) !== 'function') {
        throw new Error("filterFunction must be provided.  It should take arguments (key, value) which are strings and return [key, value] or null");
    }

    var index = 0;

    iterator.on("data", function(key, value) {
        if (options.async) {
            iterator.pause();
            filterFunction(key, value, function(new_data) {
                filterCb(new_data);
                if (!self._paused) {
                    iterator.resume();
                }
            });
        } else {
            var new_data = filterFunction(key, value);
            filterCb(new_data);
        }

        function filterCb(new_data) {
            if (new_data) {
                self.emit("data", new_data[0], new_data[1]);
                index++;
            }
        }
    });

    iterator.on("end", function() {
        self.emit("end");
    });
}

util.inherits(BcnFilter, events.EventEmitter);

BcnFilter.prototype.pause = function() {
    this._paused = true;
    this._iterator.pause();
}

BcnFilter.prototype.resume = function() {
    this._paused = false;
    this._iterator.resume();
}

exports.BcnFilter = BcnFilter;
