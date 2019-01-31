module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'dist/<%= pkg.name %>.js',
                dest: 'dist/<%= pkg.name %>.min.js'
            }
        },
        concat: {
            dist: {
                src: ['src/mainApp.js', 'src/controllers.js', 'src/characterDataService.js', 'src/draftDeck.js'],
                dest: 'dist/<%= pkg.name %>.js'
            }
        },
        less: {
            development: {
                options: {
                    paths: ["styles", "dist/css"]
                },
                files: {
                    "dist/css/galactica_styles.css": "styles/galactica_styles.less"
                }
            }
        }
    });

    
    grunt.loadNpmTasks('grunt-contrib-concat');
    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    
    grunt.loadNpmTasks('grunt-contrib-less');

    // Default task(s).
    grunt.registerTask('default', ['concat', 'uglify', 'less']);
    
};