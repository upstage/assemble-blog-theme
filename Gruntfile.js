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
    posts : grunt.file.readJSON('data/posts.json'),


    config: {
      src: 'src',
      dist: '<%= site.dest %>',
      bootstrap: '<%= vendor %>/bootstrap/less'
    },

    // Lint JavaScript
    jshint: {
      all: ['Gruntfile.js', 'helpers/*.js'],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Build HTML from templates and data
    assemble: {
      options: {
        flatten: true,

        // Custom property
        site: '<%= site %>',

        // Site variables (automatically calculated paths)
        root: '<%= site.dest %>',
        assets: '<%= site.dest %>/assets',

        // Extensions
        // plugins: ['permalinks'],
        helpers: [
          'helper-prettify',
          'helper-compose',
          'templates/helpers/*.js'
        ],
        // Templates and data
        partials: ['templates/includes/*.hbs'],
        layout: 'templates/layouts/default.hbs',
        data: ['data/**/*.{json,yml}']
      },
      blog: {
        options: {
          pages: '<%= posts.foo %>'
        },
        files: {'<%= site.dest %>/': ['templates/blog.hbs']}
      },
      example: {
        options: {
          // permalinks: {
          //   preset: 'pretty'
          // }
        },
        files: {'<%= site.dest %>/': ['templates/*.hbs']}
      }
    },


    // Compile LESS to CSS
    less: {
      options: {
        paths: ['theme/bootstrap', 'theme/components'],
      },
      // Compile Bootstrap's LESS
      bootstrap: {
        src: ['theme/theme.less'],
        dest: '<%= assemble.options.assets %>/css/blog.css'
      }
    },

    connect: {
      options: {
        port: 9000,
        livereload: 35729,
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

    // Before generating any new files,
    // remove any previously-created files.
    clean: {
      example: ['<%= site.dest %>/*.html']
    },

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

  // Build HTML, compile LESS and watch for changes. You must first run "bower install"
  // or install Bootstrap to the "vendor" directory before running this command.
  grunt.registerTask('design', ['clean', 'assemble', 'less:bootstrap', 'watch:design']);

  // Default tasks to be run.
  grunt.registerTask('default', ['clean', 'jshint', 'less', 'assemble']);
};
