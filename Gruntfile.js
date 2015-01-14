module.exports = function(grunt) {
grunt.initConfig({
    //js errors, smäller på mycket
//    jshint: {
//      all: ['public/src/js/**/*.js'] 
//    },

    // take all the js files and minify them into app.min.js
    uglify: {
      build: {
        files: {
          'public/dist/js/app.min.js': ['public/src/js/**/*.js', 'public/src/js/*.js'],
          'public/dist/js/my_libs.min.js': 'public/src/my_libs/*.js',
        }
      }
    },
    // take the processed style.css file and minify
    cssmin: {
      build: {
        files: {
          'public/dist/css/bootstrap.min.css': 'public/src/css/bootstrap.css',
          'public/dist/css/style.min.css': 'public/src/css/style.css',
          'public/dist/css/navigation.min.css': 'public/src/css/navigation.css',
        }
      }
    },
    // watch css and js files and process the above tasks
    watch: {
      css: {
        files: ['public/src/css/**/*.css'],
        tasks: ['cssmin']
      },
      js: {
        files: ['public/src/js/**/*.js'],
        tasks: ['uglify']
      }
    },
    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    // run watch and nodemon at the same time
    concurrent: {
      options: {
        logConcurrentOutput: true
      },
      tasks: ['nodemon', 'watch']
    }   

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');

  grunt.registerTask('default', ['cssmin', 'uglify', 'concurrent']);

};