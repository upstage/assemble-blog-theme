/**
 * Handlebars Helpers: {{pager}}
 * Copyright (c) 2013 Jon Schlinkert
 * Licensed under the MIT License (MIT).
 */
'use strict';

// Node.js
var path   = require('path');
var fs     = require('fs');
var _      = require('lodash');

// Export helpers
module.exports.register = function (Handlebars, options) {

  /**
   * {{pager}}
   * Adds a pager to enable navigating to prev and next page/post.
   * @param  {Object} context Context to pass to the helper, most likely `pagination`.
   * @param  {Object} opts    Pass a modifier class to the helper.
   * @return {String}         The pager, HTML.
   */
  Handlebars.registerHelper("pager", function(context, opts) {
    context = _.extend({}, context, opts.hash, this);

    var template = [
      '{{#is page.index 1}}',
      '  <ul class="pager {{modifier}}">',
      // '    <li class="pager-heading">POPULAR</li>',
      '    <li class="previous"><a href="{{relative page.dest prev.dest}}">&larr; Previous</a></li>',
      '    <li class="next"><a href="{{relative page.dest next.dest}}">Next &rarr;</a></li>',
      '  </ul>',
      '{{else}}',
      '  {{#is pagination.currentPage pagination.totalPages}}',
      '    <ul class="pager {{modifier}}">',
      '      <li class="previous"><a href="{{relative page.dest prev.dest}}">&larr; Previous</a></li>',
      '      <li class="next disabled"><a href="{{relative page.dest next.dest}}">Next &rarr;</a></li>',
      '    </ul>',
      '  {{else}}',
      '    <ul class="pager {{modifier}}">',
      '      <li class="previous"><a href="{{relative page.dest prev.dest}}">&larr; Previous</a></li>',
      '      <li class="next"><a href="{{relative page.dest next.dest}}">Next &rarr;</a></li>',
      '    </ul>',
      '  {{/is}}',
      '{{/is}}'
    ].join('\n');

    return new Handlebars.SafeString(Handlebars.compile(template)(context));
  });
};
