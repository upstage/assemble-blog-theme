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
  exports.pager = function(context, opts) {
    
    opts = _.extend({}, opts, context, this);

    var markup = [
      '<ul class="pager {{modifier}}">',
      '  <li class="previous"><a href="{{relative page.dest prev.dest}}">&larr; Previous</a></li>',
      '  <li class="next"><a href="{{relative page.dest next.dest}}">Next &rarr;</a></li>',
      '</ul>'
    ].join('\n');
    var template = Handlebars.compile(markup);
    return new Handlebars.SafeString(template(opts));
  };


  for (var helper in exports) {
    if (exports.hasOwnProperty(helper)) {
      Handlebars.registerHelper(helper, exports[helper]);
    }
  }
};
