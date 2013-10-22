/**
 * Handlebars Helpers: {{pager}}
 * Copyright (c) 2013 Jon Schlinkert
 * Licensed under the MIT License (MIT).
 */

// Node.js
var path = require('path');
var fs   = require('fs');

// node_modules
var _    = require('lodash');


// Export helpers
module.exports.register = function (Handlebars, options) {

  'use strict';

  /**
   * {{posts}}
   * Render a list of posts
   */
  exports.posts = function(context) {
    context = _.extend({}, context, this);
    return new Handlebars.SafeString(Handlebars.compile(this.page)(context));
  };


  for (var helper in exports) {
    if (exports.hasOwnProperty(helper)) {
      Handlebars.registerHelper(helper, exports[helper]);
    }
  }
};
