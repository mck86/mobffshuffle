module.exports = function(grunt) {

    grunt.initConfig({
        concat: {
            scripts: {
                src: ['src/scripts/main.js'],
                dest: 'dist/scripts/main.js',
            },
            styles: {
                src: ['src/styles/main.css'],
                dest: 'dist/styles/main.css',
            },
        },
        watch: {
            scripts: {
                files: ['src/scripts/*.js'],
                tasks: ['concat:scripts'],
            },
            styles: {
                files: ['src/styles/*.css'],
                tasks: ['concat:styles'],
            },
        },
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', ['concat','watch']);
};