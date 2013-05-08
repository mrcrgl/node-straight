/**
 * @author: Marc Riegel <mail@marclab.de>
 * Date: 08.05.13
 * Time: 13:54
 *
 */

var vows = require('vows'),
  assert = require('assert');

var Straight = require('../index');


vows.describe('Functional test').addBatch({
  'Adding non functions': {
    topic: new Straight('Test'),

    'we get an Exception with Strings': function (topic) {

      assert.throws(function() { topic.e('string') }, Error);
    },

    'we get an Exception with Integers': function (topic) {

      assert.throws(function() { topic.e(123) }, Error);
    },

    'we get an Exception with Objects': function (topic) {

      assert.throws(function() { topic.e({}) }, Error);
    },

    'we get an Exception with Arrays': function (topic) {

      assert.throws(function() { topic.e([]) }, Error);
    }
  },
  'Adding functions and execute them': {
    topic: new Straight('Test'),

    'we get the result back': function (topic) {

      topic
        .e(function (next) {

          this.set('foo', 'bar');
          next();
        })
        .e(function (next) {

          this.set('foo2', 'bar');
          next();

        })
        .e(function (next) {

          this.set('foo3', 'bar');
          next();

        })
        .e(function (next) {

          this.set('foo4', 'bar');
          next();

        })
        .e(function (next) {

          this.set('foo5', 'bar');
          next();

        })
        .error(function (err) {

          throw new Error(err);

        })
        .last(function () {

          assert.lengthOf(this._storage, 5);

        })
        .run();

    }
  }
}).export(module);