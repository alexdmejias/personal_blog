"use strict";

module.exports = function(grunt) {
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	var paths = {
		libraryDir: 'assets',
		contentImages: 'assets/images/content'
	};


	grunt.initConfig({
		creds: grunt.file.readJSON('server_creds.json'),
		paths: paths,

		imagemin: {
		    dynamic: {                         // Another target
				files: [{
					expand: true,
					cwd: '<%= paths.contentImages %>/original/',
					src: '**/*.{jpg,png}',
					dest: '<%= paths.contentImages %>/compressed/'
				}]
		    }
		},

		responsive_images: {
			dist: {
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
					cwd: '<%= paths.contentImages %>/compressed/',
					src: '**/*.{jpg,png}',
					dest: '<%= paths.contentImages %>/sized/'
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
				files: {'<%= paths.libraryDir %>/js/scripts.min.js':'<%= paths.libraryDir %>/js/scripts.concat.js'}
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
				recursive: true
			},
			staging: {
				options: {
					exclude: ['.git*', 'node_modules', '.sass-cache', 'Gruntfile.js', 'package.json',
							'.DS_Store', 'README.md', 'server_creds.json', 'content/01-projects/*', '!content/01-projects/projects.txt'],
					dest: "<%= creds.path.staging %>",
					host: "<%= creds.user %>@<%= creds.ip %>"
				}
			},
			prod: {
				options: {
					exclude: ['.git*', 'node_modules', '.sass-cache', 'Gruntfile.js', 'package.json',
							'.DS_Store', 'README.md', 'server_creds.json', 'content/01-projects/*', '!content/01-projects/projects.txt'],
					dest: "<%= creds.path.prod %>",
					host: "<%= creds.user %>@<%= creds.ip %>"
				}
			},
			staging_content: {
				options: {
					src: './content',
					dest: "<%= creds.path.staging %>",
					host: "<%= creds.user %>@<%= creds.ip %>",
				}
			},
			prod_content: {
				options: {
					src: './content',
					dest: "<%= creds.path.prod %>",
					host: "<%= creds.user %>@<%= creds.ip %>",
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

	grunt.registerTask('images', ['imagemin', 'responsive_images']);
	grunt.registerTask('build', ['sass:prod', 'autoprefixer:prod', 'concat', 'uglify', 'responsive_images']);
	grunt.registerTask('deploy', ['build', 'rsync:staging']);
	grunt.registerTask('deploy_prod', ['build', 'rsync:prod']);
	grunt.registerTask('content', ['rsync:staging_content', 'rsync:prod_content']);
	grunt.registerTask('default', ['watch']);
};