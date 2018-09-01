module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'dist/galactica.js',
                dest: 'dist/galactica.min.js'
            }
        },
        
        browserify: {
            dist: {
                src: ['src/js/main.js', 'src/js/characterData.js'],
                dest: 'dist/galactica.js'
            }
        },
        less: {
            development: {
                options: {
                    paths: ["src/styles", "dist"]
                },
                files: {
                    "dist/galactica.css": "src/styles/main.less"
                }
            }
        },
        'ftp-deploy': {
            build: {
              auth: {
                host: 'sfhaven.mbnet.fi',
                port: 21,
                authKey: 'key1'
              },
              src: 'dist',
              dest: '/public_html/beta'
            }
          }
    });

    
    //grunt.loadNpmTasks('grunt-contrib-concat');
    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    
    grunt.loadNpmTasks('grunt-contrib-less');

    grunt.loadNpmTasks('grunt-browserify');

    grunt.loadNpmTasks('grunt-ftp-deploy');

    // Default task(s).
    grunt.registerTask('default', ['browserify', 'uglify', 'less']);
  
    grunt.registerTask("debug-server", ['browserify', 'ftp-deploy']);
};