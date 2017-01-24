module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        project: {
            src: 'src',
            dist: 'dist'
        },
        concat: {
            scripts: {
                src: ['<%= project.src %>/scripts/**/*.js'],
                dest: '<%= project.dist %>/scripts/main.js'
            }
        },
        watch: {
            options: {
                livereload: '<%= connect.options.livereload %>',
            },
            pages: {
                files: ['<%= project.src %>/pages/**/*.html'],
                tasks: ['htmlhint', 'clean:pages', 'copy:pages']
            },
            index: {
                files: ['<%= project.src %>/index.html'],
                tasks: ['htmlhint', 'clean:index', 'htmlbuild']
            },
            fonts: {
                files: ['<%= project.src %>/scripts/*.js'],
                tasks: ['concat:scripts']
            },
            images: {
                files: ['<%= project.src %>/styles/*.css'],
                tasks: ['concat:styles']
            },
            scripts: {
                files: ['<%= project.src %>/styles/*.css'],
                tasks: ['concat:styles']
            },
            styles: {
                files: ['<%= project.src %>/styles/*.css'],
                tasks: ['concat:styles']
            }
        },
        connect: {
            options: {
                port: 9001,
                hostname: 'localhost',
                livereload: 35735
            },
            livereload: {
                options: {
                    open: 'http://localhost:<%= connect.options.port %>',
                    base: ['<%= project.dist %>']
                }
            }
        },
        htmlbuild: {
            index: {
                src: '<%= project.src %>/index.html',
                dest: '<%= project.dist %>/index.html',
                options: {
                    beautify: true,
                    relative: true
                }
            }
        },
        clean: {
            index: ['<%= project.dist %>/index.html'],
            scripts: ['<%= project.dist %>/scripts/**'],
            pages: ['<%= project.dist %>/pages/**'],
            styles: ['<%= project.dist %>/styles/**'],
            images: ['<%= project.dist %>/images/**'],
            fonts: ['<%= project.dist %>/fonts/**'],
            root: ['<%= project.dist %>/**']
        },
        copy: {
            images: {
                files: [{
                    expand: true,
                    cwd: '<%= project.src %>/',
                    src: ['images/**'],
                    dest: '<%= project.dist %>'
                }]
            },
            pages: {
                files: [{
                    expand: true,
                    cwd: '<%= project.src %>/',
                    src: ['views/**'],
                    dest: '<%= project.dist %>'
                }]
            },
            fonts: {
                files: [{
                    expand: true,
                    cwd: '<%= project.src %>/',
                    src: ['fonts/**'],
                    dest: '<%= project.dist %>'
                }]
            },
            dependencies: {
                files: [{
                    expand: true,
                    cwd: 'bower_components',
                    src: ['**'],
                    dest: '<%= project.dist %>/vendors'
                }]
            }
        },
        htmlhint: {
            all: {
                options: {
                    'tagname-lowercase': true,
                    'attr-lowercase': true,
                    'attr-value-double-quotes': true,
                    'attr-value-not-empty': false,
                    'attr-no-duplication': true,
                    'doctype-first': false,
                    'tag-pair': true,
                    'tag-self-close': false,
                    'spec-char-escape': true,
                    'id-unique': true,
                    'src-not-empty': true
                },
                src: ['<%= project.src %>/pages/*.html']
            }
        },
        jshint: {
            options: {
                'eqnull': true
            },
            all: {
                src: ['Gruntfile.js', '<%= project.src %>/scripts/**/*.js']
            }
        },
        less: {
            dist: {
                options: {
                    strictMath: true,
                    sourceMap: true,
                    outputSourceFiles: true,
                    sourceMapURL: 'main.css.map',
                    sourceMapFilename: '<%= project.dist %>/styles/main.css.map'
                },
                files: {
                    '<%= project.dist %>/styles/main.css': '<%= project.src %>/styles/main.less'
                }
            }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-html-build');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-htmlhint');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.registerTask('default', ['htmlhint', 'jshint']);    
    grunt.registerTask('build', ['default','clean:root','concat:scripts','copy','less','htmlbuild:index']);
    grunt.registerTask('serve', ['build','connect:livereload','watch']);
};