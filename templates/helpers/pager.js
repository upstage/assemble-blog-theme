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

// Export helpers
module.exports.register = function (Handlebars, options) {

  'use strict';


  /**
   * {{pager}}
   */
  exports.pager = function(context, modifier) {
    if(_.isUndefined(modifier)) {
      modifier = '';
    } else {
      modifier = modifier;
    }
    var markup = [
      '<ul class="pager '  + modifier + '">',
      '  <li class="previous"><a href="#">&larr; Previous</a></li>',
      '  <li class="next"><a href="#">Next &rarr;</a></li>',
      '</ul>'
    ].join('\n');
    return new Handlebars.SafeString(markup);
  };


  for (var helper in exports) {
    if (exports.hasOwnProperty(helper)) {
      Handlebars.registerHelper(helper, exports[helper]);
    }
  }
};
