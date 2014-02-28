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

		concat: {
			options: {
				separator: ';'
			},

			dist: {
				src: ['<%= paths.libraryDir %>/js/libs/*.js', '<%= paths.libraryDir %>/js/scripts.js'],
				dest: '<%= paths.libraryDir %>/js/scripts.concat.js'
			}
		},

		uglify: {
			options: {
				report: 'min'
			},
			prod: {
				files: {'<%= paths.libraryDir %>/js/scripts.min.css':'<%= paths.libraryDir %>/js/scripts.concat.js'}
			}
		},

		sass: {
			options: {
				sourceComments: 'map'
			},
			dev: {
				files: {
					'<%= paths.libraryDir %>/css/styles.css':'<%= paths.libraryDir %>/scss/styles.scss'
				}
			},
			prod: {
				options: {
					outputStyle: 'compressed'
				},
				files: {
					'<%= paths.libraryDir %>/css/styles.min.css':'<%= paths.libraryDir %>/scss/styles.scss'
				}
			}
		},

		autoprefixer: {
			dev: {
				src: '<%= paths.libraryDir %>/css/styles.css',
				dest: '<%= paths.libraryDir %>/css/styles.css'
			},
			prod: {
				src: '<%= paths.libraryDir %>/css/styles.min.css',
				dest: '<%= paths.libraryDir %>/css/styles.min.css'
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
				tasks: ['sass:dev', 'autoprefixer:dev']
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
		}
	});

	grunt.registerTask('build', ['sass:prod', 'autoprefixer:prod', 'concat', 'uglify', 'responsive_images']);
	grunt.registerTask('deploy', ['build', 'rsync:staging']);
	grunt.registerTask('deploy_prod', ['build', 'rsync:prod']);
	grunt.registerTask('default', ['watch']);
};