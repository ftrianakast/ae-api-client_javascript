module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            files: ['dataAppExecutor.js', 'aentropico_lib/*/*.js'],
            tasks: ['browserify']
        },
        browserify: {
            client: {
                src: ['dataAppExecutor.js'],
                dest: 'test/public/ae.js',
                options: {
                    alias: ['dataAppExecutor:ae']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browserify');
};