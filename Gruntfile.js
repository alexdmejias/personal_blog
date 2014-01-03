"use strict";

module.exports = function(grunt) {
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	var paths = {
		libraryDir: 'assets/'
	};


	grunt.initConfig({
		creds: grunt.file.readJSON('../server_creds.json'),
		paths: paths,

		watch: {
			compass: {
				files: ['<%= paths.libraryDir %>/scss/**/*.scss'],
				tasks: ['compass']
			},

			livereload: {
				options: { livereload: true },
				files: ['<%= paths.libraryDir %>/styles/styles.css', '<%= paths.appDir %>/**/*.php']
			}
		},

		sass: {
			dist: {
				options: {
					force: true,
					cssDir: '<%= paths.libraryDir %>/styles/',
					sassDir: '<%= paths.libraryDir %>/scss/'
				}
			}
		},

        rsync: {
            options: {
                src: "../",
                args: ["--verbose"],
                exclude: ['.git*', 'node_modules', '.sass-cache', 'Gruntfile.js', 'package.json', '.DS_Store', 'README.md', 'config.rb', '.jshintrc'],
                recursive: true,
                syncDestIgnoreExcl: true
            },
            staging: {
                options: {
                    dest: "<%= creds.path.staging %>",
                    host: "<%= creds.user %>@<%= creds.ip %>"
                }
            },
            staging: {
                options: {
                    dest: "<%= creds.path.prod %>",
                    host: "<%= creds.user %>@<%= creds.ip %>"
                }
            }
        }

	});

	grunt.registerTask('default', ['watch']);
};