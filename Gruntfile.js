'use strict';

module.exports = function (grunt) {
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	var paths = {
		libraryDir: 'assets',
		contentImages: 'assets/images/content'
	};


	grunt.initConfig({
		creds: grunt.file.readJSON('server_creds.json'),
		paths: paths,

		imagemin: {
			content: {
				files: [{
					expand: true,
					cwd: '<%= paths.contentImages %>/original/',
					src: '**/*.{jpg,png}',
					dest: '<%= paths.contentImages %>/compressed/'
				}]
			},
			thumbnails: {
				files: [{
					expand: true,
					cwd: 'assets/images/thumbnails/',
					src: '**/*.{jpg,png}',
					dest: 'assets/images/thumbnails/'
				}]
			}
		},

		responsive_images: {
			dist: {
				options: {
					sizes: [{
						name: 'small',
						width: 250,
					}, {
						name: 'medium',
						width: 400
					}, {
						name: 'large',
						width: 800,
					}, {
						name: 'xlarge',
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
				report: 'min',
				banner: '/* <%= grunt.template.today("yyyy-mm-dd, h:MM:ss TT") %> */\n'
			},
			prod: {
				files: {'<%= paths.libraryDir %>/js/scripts.min.js': '<%= paths.libraryDir %>/js/scripts.concat.js'}
			}
		},

		sass: {
			dev: {
				files: {
					'<%= paths.libraryDir %>/css/styles.css': '<%= paths.libraryDir %>/scss/styles.scss'
				}
			},
			prod: {
				options: {
					sourceComments: 'map',
					outputStyle: 'compressed'
				},
				files: {
					'<%= paths.libraryDir %>/css/styles.min.css': '<%= paths.libraryDir %>/scss/styles.scss'
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

		file_append: {
			default_options: {
				files: {
					'assets/css/styles.min.css': {
						prepend: '/*<%= grunt.template.today("yyyy-mm-dd, h:MM:ss TT") %> */\n',
					}
				}
			}
		},

		rsync: {
			options: {
				src: './',
				args: ['--verbose'],
				recursive: true
			},
			staging: {
				options: {
					exclude: ['.git*', 'node_modules', '.sass-cache', 'Gruntfile.js', 'package.json',
							'.DS_Store', 'README.md', 'server_creds.json', 'content'],
					dest: '<%= creds.path.staging %>',
					host: '<%= creds.user %>@<%= creds.ip %>'
				}
			},
			prod: {
				options: {
					exclude: ['.git*', 'node_modules', '.sass-cache', 'Gruntfile.js', 'package.json',
							'.DS_Store', 'README.md', 'server_creds.json', 'content'],
					dest: '<%= creds.path.prod %>',
					host: '<%= creds.user %>@<%= creds.ip %>'
				}
			},
			staging_content: {
				options: {
					syncDest: true,
					src: './content',
					dest: '<%= creds.path.staging %>',
					host: '<%= creds.user %>@<%= creds.ip %>',
				}
			},
			prod_content: {
				options: {
					syncDest: true,
					src: './content',
					dest: '<%= creds.path.prod %>',
					host: '<%= creds.user %>@<%= creds.ip %>',
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
		},

		aws_s3: {
			options: {
				accessKeyId: '<%= creds.aws.key %>', // Use the variables
				secretAccessKey: '<%= creds.aws.secret %>', // You can also use env variables
				uploadConcurrency: 5, // 5 simultaneous uploads
				downloadConcurrency: 5 // 5 simultaneous downloads
			},
			prod: {
				options: {
					bucket: '<%= creds.aws.bucket %>',
					differential: true // Only uploads the files that have changed
				},
				files: [
					{
						expand: true,
						cwd: 'assets/',
						src: ['css/styles.min.css', 'images/**', 'js/libs/**', 'js/jquery*', 'js/scripts.min.js'],
						dest: 'alexdmejias.com/assets/'
					}
				]
			}
		}
	});

	grunt.registerTask('images', ['imagemin', 'responsive_images']);
	grunt.registerTask('build', ['sass:prod', 'autoprefixer:prod', 'file_append', 'concat', 'uglify', 'responsive_images']);
	grunt.registerTask('deploy_dev', ['build', 'rsync:staging']);
	grunt.registerTask('deploy_prod', ['build', 'aws_s3', 'rsync:prod']);
	grunt.registerTask('deploy', ['deploy_dev', 'deploy_prod']);
	grunt.registerTask('content', ['rsync:staging_content', 'rsync:prod_content']);
	grunt.registerTask('default', ['watch']);
};