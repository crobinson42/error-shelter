module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    uglify: {
      build: {
        src: 'errorShelter.js',
        dest: 'src/errorShelter.min.js'
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['uglify']);

};
