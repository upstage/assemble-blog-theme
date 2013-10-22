/*
 * blog
 * https://github.com/Jon Schlinkert/blog
 * Copyright (c) 2013
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    // Project metadata
    pkg   : grunt.file.readJSON('package.json'),
    vendor: grunt.file.readJSON('.bowerrc').directory,
    site  : grunt.file.readYAML('_config.yml'),
    pages : grunt.file.readJSON('data/pages.json'),


    config: {
      src: 'src',
      dist: '<%= site.dest %>',
      bootstrap: '<%= vendor %>/bootstrap/less'
    },


    /**
     * Lint JavaScript
     */
    jshint: {
      all: ['Gruntfile.js', 'helpers/*.js'],
      options: {
        jshintrc: '.jshintrc'
      }
    },


    /**
     * Build HTML from templates and data
     */
    assemble: {
      options: {
        flatten: true,

        // Custom property for _config.yml
        site: '<%= site %>',

        // Extensions
        helpers: ['helper-prettify', 'helper-compose', 'templates/helpers/*.js'],
        // plugins: ['permalinks'],
        // permalinks: {
        //   preset: 'pretty'
        // }
        // Templates and data
        data: ['data/**/*.{json,yml}'],
        partials: ['templates/includes/*.hbs'],
        layoutdir: 'templates/layouts',
        layout: 'default.hbs',

        // Site variables
        assets: '<%= site.dest %>/assets',
        root: '<%= site.dest %>',
      },
      // Generate the main pages of the site.
      site: {
        files: {
          '<%= site.dest %>/': ['templates/*.hbs']
        }
      },
      // Generate posts from "./data/pages.json"
      blog: {
        options: {
          pages: '<%= pages.posts %>'
        },
        files: {
          '<%= site.dest %>/': ['templates/index.hbs']
        }
      },
      // Generate posts by forcing Handlebars
      // to recognize `.md` files as templates.
      blog_alt: {
        options: {
          layout: 'blog.hbs',
          engine: 'handlebars'
        },
        files: {
          '<%= site.dest %>/alt/': ['templates/list.hbs', 'posts/*.md']
        }
      }
    },


    /**
     * Compile LESS to CSS
     */
    less: {
      options: {
        paths: ['theme/bootstrap', 'theme/components'],
      },
      bootstrap: {
        src: ['theme/theme.less'],
        dest: '<%= assemble.options.assets %>/css/blog.css'
      }
    },


    /**
     * Start a connect web server.
     */
    connect: {
      options: {
        port: 9000,
        livereload: 35729,
        keepalive: true,
        hostname: 'localhost'
      },
      livereload: {
        options: {
          open: true,
          base: [
            '<%= config.dist %>'
          ]
        }
      }
    },


    /**
     * Before generating any new files,
     * clean out files from previous build.
     */
    clean: {
      example: ['<%= site.dest %>/**/*.html']
    },



    /**
     * Run predefined tasks whenever watched file
     * patterns are added, changed or deleted.
     */
    watch: {
      all: {
        files: ['<%= jshint.all %>'],
        tasks: ['jshint', 'nodeunit']
      },
      design: {
        files: ['Gruntfile.js', '<%= less.options.paths %>/*.less', 'templates/**/*.hbs'],
        tasks: ['design']
      }
    }
  });

  // Load npm plugins to provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('assemble-less');
  grunt.loadNpmTasks('assemble');

  // Build HTML, compile LESS and watch for changes.
  grunt.registerTask('design', ['clean', 'assemble', 'less:bootstrap', 'watch:design', 'connect']);

  // Default tasks to be run.
  grunt.registerTask('default', ['clean', 'jshint', 'less', 'assemble']);
};
