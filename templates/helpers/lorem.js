/**
 * Handlebars Helpers
 * Copyright (c) 2013 lesscss.org
 * Licensed under the MIT License (MIT).
 */

// Node.js
var path   = require('path');
var fs     = require('fs');

// node_modules
var _      = require('grunt').util._;

// Lorem ipsum generator
var loremIpsum = require('lorem-ipsum')

// Export helpers
module.exports.register = function (Handlebars, options) {

  'use strict';

  /**
   * {{lorem}}
   * Return a property from package.json
   * @param  {String} key
   * @return {String}
   */
  exports.lorem = function(context) {
    var text = loremIpsum(_.extend({
      count: 1, // Number of words, sentences, or paragraphs to generate.
      units: 'sentences', // Generate words, sentences, or paragraphs.
      sentenceLowerBound: 5, // Minimum words per sentence.
      sentenceUpperBound: 10, // Maximum words per sentence.
      paragraphLowerBound: 3, // Minimum sentences per paragraph.
      paragraphUpperBound: 7, // Maximum sentences per paragraph.
      format: 'plain', // Plain text or html
      random: Math.random // A PRNG function. Uses Math.random by default
    }, context));
    return new Handlebars.SafeString(text);
  };


  for (var helper in exports) {
    if (exports.hasOwnProperty(helper)) {
      Handlebars.registerHelper(helper, exports[helper]);
    }
  }
};
