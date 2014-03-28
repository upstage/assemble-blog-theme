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
    pkg: grunt.file.readJSON('package.json'),
    site: grunt.file.readYAML('.assemblerc.yml'),
    blog: grunt.file.readJSON('data/blog.json'),
    vendor: grunt.file.readJSON('.bowerrc').directory,

    /**
     * Lint JavaScript
     */

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        '<%= site.helpers %>/*.js'
      ]
    },


    /**
     * HTML
     */

    // Build HTML from templates and data
    assemble: {
      options: {
        flatten: true,
        assets: '<%= site.assets %>',

        // Metadata
        site: '<%= site %>',
        root: '<%= site.dest %>',
        data: '<%= site.data %>/**/*.{json,yml}',

        // Extensions
        helpers: '<%= site.helpers %>/*.js',

        // Templates
        partials: ['<%= site.includes %>/*.hbs'],
        layoutdir: '<%= site.layoutdir %>',
        layoutext: '<%= site.layoutext %>',
        layout: '<%= site.layout %>'
      },

      // Generate the main pages of the site.
      site: {
        files: {
          '<%= site.dest %>/': ['<%= site.pages %>/*.hbs']
        }
      },

      // Generate posts from JSON data. see: './data/pages.json'
      blog: {
        options: {
          pages: '<%= blog.posts %>'
        },
        files: {
          '<%= site.dest %>/blog/': ['<%= site.pages %>/blog.hbs']
        }
      },

      // Generate posts from markdown files
      blog_alt: {
        options: {layout: 'blog'},
        files: {
          '<%= site.dest %>/alt/': ['<%= site.posts %>/*.md']
        }
      }
    },


    /**
     * Compile LESS to CSS
     */

    less: {
      options: {
        paths: ['<%= vendor %>/bootstrap/less', 'theme/components'],
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
          base: ['<%= site.dest %>']
        }
      }
    },

    /**
     * Copy vendor dist to assets
     */
    copy: {
      bootstrap: {
        files: [
          {
            expand: true,
            cwd: '<%= vendor %>/bootstrap/dist/',
            src: ['js/*', 'fonts/*'],
            dest: '<%= assemble.options.assets %>/'
          },
          {
            expand: true,
            cwd: 'vendor/bootstrap/assets/',
            src: ['js/*', 'fonts/*'],
            dest: '<%= assemble.options.assets %>/'
          }
        ]
      },
      jquery: {
        src: '<%= vendor %>/jquery/jquery.min.js',
        dest: '<%= assemble.options.assets %>/js/jquery.js'
      },
      holder: {
        src: '<%= vendor %>/holderjs/holder.js',
        dest: '<%= assemble.options.assets %>/js/holder.js'
      },
      highlight: {
        src: '<%= vendor %>/highlightjs/highlight.pack.js',
        dest: '<%= assemble.options.assets %>/js/highlight.js'
      },
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
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('assemble-less');
  grunt.loadNpmTasks('assemble');

  // Build HTML, compile LESS and watch for changes.
  grunt.registerTask('design', ['clean', 'assemble', 'less:bootstrap', 'watch:design', 'connect']);

  // Default tasks to be run.
  grunt.registerTask('default', ['clean', 'jshint', 'less', 'copy', 'assemble']);
};
