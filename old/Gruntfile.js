module.exports = function(grunt) {
	grunt.initConfig({
		jshint: {
			files: [
				'**/*.js',
				'package.json',
			],
			options: {
				jshintrc: '.jshintrc'
			}
		},
		watch: {
			html: {
				files: '**/*.html',
				tasks: [],
				options: {
					livereload: true
				}
			},
			css: {
				files: '**/*.css',
				tasks: [],
				options: {
					livereload: true
				}
			},
			js: {
				files: '**/*.js',
				options: {
					livereload: true
				}
			}
		},
		connect: {
			server: {
		    	options: {
					port: 4000,
					base: '.'
		    	}
			}
		}
	});
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.registerTask('default', ['connect', 'watch']);
};
