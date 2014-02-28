"use strict";

module.exports = function(grunt) {
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	var paths = {
		libraryDir: 'assets'
	};


	grunt.initConfig({
		creds: grunt.file.readJSON('server_creds.json'),
		paths: paths,

		responsive_images: {
			myTask: {
				options: {
					sizes: [{
						name: 'small',
						width: 250,
					},{
						name: 'medium',
						width: 400
					},{
						name: "large",
						width: 800,
					},{
						name: "xlarge",
						width: 1200
					}]
				},
				files: [{
					expand: true,
					cwd: 'assets/images/content/',
					src: ['*.{jpg,gif,png}'],
					dest: 'assets/images/content/sized/'
				}]
			}
		},

		watch: {
			options: {
				livereload: true
			},

			sass: {
				options: {
					livereload: false
				},
				files: ['<%= paths.libraryDir %>/scss/**/*.scss'],
				tasks: ['sass', 'autoprefixer']
			},

			css: {
				files: ['<%= paths.libraryDir %>/css/styles.css'],
			},

			php: {
				files: ['site/**/*.php']
			},

			txt: {
				files: ['content/**/*.txt']
			},

			js: {
				files: ['<%= paths.libraryDir %>/js/**/*.js', '!<%= paths.libraryDir %>/js/scripts.concat.js'],
				tasks: ['concat']
			}
		},

		concat: {
			options: {
				separator: ';'
			},

			dist: {
				src: ['<%= paths.libraryDir %>/js/libs/*.js', '<%= paths.libraryDir %>/js/scripts.js'],
				dest: '<%= paths.libraryDir %>/js/scripts.concat.js'
			}
		},

		autoprefixer: {
			dist: {
				src: '<%= paths.libraryDir %>/css/styles.css',
				dest: '<%= paths.libraryDir %>/css/styles.css'
			}
		},

		sass: {
			options: {
				sourceComments: 'map'
			},
			dist: {
				files: {
					'<%= paths.libraryDir %>/css/styles.css':'<%= paths.libraryDir %>/scss/styles.scss'
				}
			}
		},

				rsync: {
						options: {
								src: "./",
								args: ["--verbose"],
								exclude: ['.git*', 'node_modules', '.sass-cache', 'Gruntfile.js', 'package.json', '.DS_Store', 'README.md', 'server_creds.json'],
								recursive: true,
								syncDestIgnoreExcl: true
						},
						staging: {
								options: {
										dest: "<%= creds.path.staging %>",
										host: "<%= creds.user %>@<%= creds.ip %>"
								}
						},
						prod: {
								options: {
										dest: "<%= creds.path.prod %>",
										host: "<%= creds.user %>@<%= creds.ip %>"
								}
						}
				}

	});

	grunt.registerTask('default', ['watch']);
};