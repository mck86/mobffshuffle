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
            options: {
                livereload: true,
            },
            scripts: {
                files: ['src/scripts/*.js'],
                tasks: ['concat:scripts'],
            },
            styles: {
                files: ['src/styles/*.css'],
                tasks: ['concat:styles'],
            },
        },
        connect: {
            server: {
                options: {
                    port: 9001,
                    livereload: true
                },
            },
        },
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.registerTask('default', ['concat','watch','connect']);
};