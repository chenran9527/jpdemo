//添加自己合适的gruntfile配置，运行，得出预期输出
module.exports=function(grunt){
    //任务配置
    grunt.initConfig({
        //读取package.json文件
        pkg: grunt.file.readJSON('package.json'),
        //concat用来合并js文件
        concat: {
            options: {
                // 定义一个用于插入合并输出文件之间的字符
                separator: ';'
            },
            dist: {
                // 将要被合并的文件
                src: ['src/script/**/*.js'],
                // 合并后的JS文件的存放位置
                dest: 'dist/script/<%= pkg.name %>.js'
            }
        },
        //uglify用来压缩js文件
        uglify: {
            options: {
                // 此处定义的banner注释将插入到输出文件的顶部
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    //uglify会自动压缩concat任务中生成的文件
                    'dist/script/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },
        //jshint用来检查js代码规范
        jshint: {
            files: [ 'src/script/**/*.js'], //要进行js检查的文件
            options: {jshintrc:'.jshintrc'}
        },
        //watch用来监听文件，当文件发生变化时会执行tasks中指定的任务
        watch: {
            //监听的文件
            // files: ['<%= jshint.files %>','src/index.html'],
            // tasks: ['jshint'],
            bower: {                 //为观察bower.json
                files: ['bower.json'],
                tasks: ['wiredep']
            },
            test:{
                files:['Gruntfile.js','src/**'],
                tasks:['wiredep:test','copy:test']
            }
        },
        //使用babel讲6代码转换为es5
        babel: {
            options: {
                sourceMap: true,
                // presets: ['babel-preset-es2015']
            },
            dist: {
                files:  [{
                    "expand": true,
                    "cwd": "src/",
                    "src": ["script/**/*.js"],
                    "dest": "dist/script/",
                    "ext": ".js"
                }]
            }
        },
        wiredep: {
            app: {

                // Point to the files that should be updated when
                // you run `grunt wiredep`
                src: [
                    'src/index.html',   // .html support...
                    // 'app/views/**/*.jade',   // .jade support...
                    // 'app/styles/main.scss',  // .scss & .sass support...
                    // 'app/config.yml'         // and .yml & .yaml support out of the box!
                ],

                options: {
                    // See wiredep's configuration documentation for the options
                    // you may pass:

                    // https://github.com/taptapship/wiredep#configuration
                }
            },
            test: {
                src: [
                    'src/index.html',   // .html support...
                    // 'app/views/**/*.jade',   // .jade support...
                    // 'app/styles/main.scss',  // .scss & .sass support...
                    // 'app/config.yml'         // and .yml & .yaml support out of the box!
                ]
            }
        },

        connect: {
            server: {
                options: {
                    port: 8000,
                    hostname: '*',
                    base: ['test/']
                }
            }
        },
        copy: {
            test: {
                files: [{
                    expand: true,
                    cwd:'src/',
                    src: ['**'],
                    dest: 'test'
                    // filter: 'isFile'
                }]
            }
        },
    });
    //载入任务
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-wiredep');
    // grunt.loadNpmTasks('grunt-babel');
    //注册任务
    grunt.registerTask('test', ['jshint','watch']);
    grunt.registerTask('build', ['jshint','concat','uglify','watch']);
    grunt.registerTask('server', ['jshint','wiredep:test','copy:test','connect','watch:test']);
    // grunt.registerTask('wiredep', ['wiredep']);
};