/**
 * @author: Marc Riegel <mail@marclab.de>
 * Date: 08.05.13
 * Time: 12:03
 *
 */

var Straight = function(context) {
  this.context = context;

};

Straight.prototype = {

  context: '',

  _storage: {},

  _stack: [],

  _last: function() {},

  _error: function() { throw new Error(err); },

  get: function(key) {

    if (this._storage.hasOwnProperty(key)) {
      return this._storage[key];
    }

    return undefined;
  },

  set: function(key, value) {
    this._storage[key] = value;
  },

  e: function(fnc) {

    if ('function' !== typeof fnc) {
      throw new Error("Attribute is not a function.");
    }

    this._stack.push(fnc);

    return this;
  },

  error: function(fnc) {

    if ('function' !== typeof fnc) {
      throw new Error("Attribute is not a function.");
    }

    this._error = fnc;

    this._error.bind(this);

    return this;
  },

  last: function(fnc) {

    if ('function' !== typeof fnc) {
      throw new Error("Attribute is not a function.");
    }

    this._last = fnc;

    this._last.bind(this);

    return this;
  },

  run: function() {
    this._next();
  },

  _next: function(err) {

    var self = this;

    if (err) {
      return self._error(err);
    }

    if (self._stack.length > 0) {
      var fnc = self._stack.shift();
      //fnc.bind(this);

      try {
        return fnc.apply(self, [self._next.bind(self)]);
      } catch(e) {
        return this._error(e);
      }
    }

    this._last();
  }
};

module.exports = Straight;