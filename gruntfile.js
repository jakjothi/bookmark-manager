'use strict';

module.exports = function(grunt) {
    grunt.initConfig({
        env: {
            test: {
                NODE_ENV: 'test'
            }
        },
        mocha_istanbul: {
            coverage: {
                src: ['app/**/tests/**/*.js'],
                options: {
                    coverageFolder: 'coverage/mocha',
                    mask: '*.js',
                    require: 'server.js',
                    excludes: ['gruntfile.js', 'wallaby.js', '**/public/**', '**/config/**', '**/db/**'],
                    istanbulOptions: [
                        '--include-all-sources',
                        '--default-excludes'
                    ]
                }
            }
        },
        istanbul_check_coverage: {
            mocha: {
                options: {
                    coverageFolder: 'coverage/mocha',
                    check: {
                        statements: 100,
                        branches: 100,
                        functions: 100,
                        lines: 100
                    }
                }
            }
        },
        jshint: {
            all: {
                src: ['app', 'config', 'db'],
                options: {
                    jshintrc: true
                }
            }
        },
        jscs: {
            all: {
                files: {
                    src: ['app', 'config', 'db']
                },
                options: {
                    config: '.jscsrc'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-mocha-istanbul');
    grunt.loadNpmTasks('grunt-jscs');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-env');
    
    grunt.registerTask('cover', ['env:test', 'lint', 'mocha_istanbul']);
    grunt.registerTask('lint', ['jshint', 'jscs']);
    grunt.registerTask('check', ['cover', 'istanbul_check_coverage', 'lint']);
};
