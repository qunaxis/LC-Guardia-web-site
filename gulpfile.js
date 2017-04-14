var gulp           = require('gulp'),
		gutil          = require('gulp-util' ),
		sass           = require('gulp-sass'),
		browserSync    = require('browser-sync'),
		concat         = require('gulp-concat'),
		uglify         = require('gulp-uglify'),
		cleanCSS       = require('gulp-clean-css'),
		rename         = require('gulp-rename'),
		del            = require('del'),
		imagemin       = require('gulp-imagemin'),
		pngquant       = require('imagemin-pngquant'),
		cache          = require('gulp-cache'),
		autoprefixer   = require('gulp-autoprefixer'),
		fileinclude    = require('gulp-file-include'),
		gulpRemoveHtml = require('gulp-remove-html'),
		bourbon        = require('node-bourbon'),
		ftp            = require('vinyl-ftp'),
		notify         = require("gulp-notify");

gulp.task('browser-sync', function() {
	browserSync({
		proxy: 'gvardiya48.dev',
		notify: false
	});
});

gulp.task('sass', ['headersass', 'headersass-costs', 'headersass-contacts', 'headersass-gallery', 'headersass-about', 'headersass-feedback'], function() {
	return gulp.src('app/sass/**/*.sass')
		.pipe(sass({
			includePaths: bourbon.includePaths
		}).on("error", notify.onError()))
		.pipe(rename({suffix: '.min', prefix : ''}))
		.pipe(autoprefixer(['last 15 versions']))
		.pipe(cleanCSS())
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({stream: true}))
});

gulp.task('headersass', function() {
	return gulp.src('app/header.sass')
		.pipe(sass({
			includePaths: bourbon.includePaths
		}).on("error", notify.onError()))
		.pipe(rename({suffix: '.min', prefix : ''}))
		.pipe(autoprefixer(['last 15 versions']))
		.pipe(cleanCSS())
		.pipe(gulp.dest('app'))
		.pipe(browserSync.reload({stream: true}))
});

gulp.task('headersass-costs', function() {
	return gulp.src('app/header-costs.sass')
		.pipe(sass({
			includePaths: bourbon.includePaths
		}).on("error", notify.onError()))
		.pipe(rename({suffix: '.min', prefix : ''}))
		.pipe(autoprefixer(['last 15 versions']))
		.pipe(cleanCSS())
		.pipe(gulp.dest('app'))
		.pipe(browserSync.reload({stream: true}))
});

gulp.task('headersass-contacts', function() {
    return gulp.src('app/header-сontacts.sass')
        .pipe(sass({
            includePaths: bourbon.includePaths
        }).on("error", notify.onError()))
        .pipe(rename({suffix: '.min', prefix : ''}))
        .pipe(autoprefixer(['last 15 versions']))
        .pipe(cleanCSS())
        .pipe(gulp.dest('app'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('headersass-gallery', function() {
    return gulp.src('app/header-gallery.sass')
        .pipe(sass({
            includePaths: bourbon.includePaths
        }).on("error", notify.onError()))
        .pipe(rename({suffix: '.min', prefix : ''}))
        .pipe(autoprefixer(['last 15 versions']))
        .pipe(cleanCSS())
        .pipe(gulp.dest('app'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('headersass-about', function() {
    return gulp.src('app/header-about.sass')
        .pipe(sass({
            includePaths: bourbon.includePaths
        }).on("error", notify.onError()))
        .pipe(rename({suffix: '.min', prefix : ''}))
        .pipe(autoprefixer(['last 15 versions']))
        .pipe(cleanCSS())
        .pipe(gulp.dest('app'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('headersass-feedback', function() {
    return gulp.src('app/header-feedback.sass')
        .pipe(sass({
            includePaths: bourbon.includePaths
        }).on("error", notify.onError()))
        .pipe(rename({suffix: '.min', prefix : ''}))
        .pipe(autoprefixer(['last 15 versions']))
        .pipe(cleanCSS())
        .pipe(gulp.dest('app'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('libs', function() {
	return gulp.src([
		'app/libs/jquery/dist/jquery.min.js',
		'app/libs/slick-carousel/slick/slick.min.js',
		'app/libs/tabs/js/ion.tabs.min.js',
		'app/libs/masonry/dist/masonry.pkgd.min.js',
		 'app/libs/magnific-popup/dist/jquery.magnific-popup.min.js'
		])
		.pipe(concat('libs.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('app/js'));
});

gulp.task('watch', ['sass', 'libs', 'browser-sync'], function() {
	gulp.watch('app/header.sass', ['headersass']);
	gulp.watch('app/header-costs.sass', ['headersass-costs']);
	gulp.watch('app/header-сontacts.sass', ['headersass-contacts']);
	gulp.watch('app/header-gallery.sass', ['headersass-gallery']);
	gulp.watch('app/header-about.sass', ['headersass-about']);
	gulp.watch('app/header-feedback.sass', ['headersass-feedback']);
	gulp.watch('app/sass/**/*.sass', ['sass']);
	gulp.watch('app/*.php', browserSync.reload);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('imagemin', function() {
	return gulp.src('app/img/**/*')
		.pipe(cache(imagemin({
			interlaced: true,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		})))
		.pipe(gulp.dest('docs/img'));
});

gulp.task('build-html', function() {
  gulp.src(['app/*.html'])
    .pipe(fileinclude({
      prefix: '@@'
    }))
    .pipe(gulpRemoveHtml())
    .pipe(gulp.dest('docs/'));
});

gulp.task('build-php', function() {
  gulp.src(['app/*.php'])
    .pipe(fileinclude({
      prefix: '@@'
    }))
    .pipe(gulpRemoveHtml())
    .pipe(gulp.dest('docs/'));
});



gulp.task('removedist', function() { return del.sync('docs'); });

gulp.task('build', ['removedist', 'build-html', 'build-php', 'imagemin', 'sass', 'libs'], function() {

	var buildCss = gulp.src([
		'app/css/fonts.min.css',
		'app/css/main.min.css',
		'app/css/main-costs.min.css',
        'app/css/main-contacts.min.css',
		'app/css/main-gallery.min.css',
		'app/css/main-about.min.css',
		'app/css/main-feedback.min.css'
		]).pipe(gulp.dest('docs/css'));

	var buildFiles = gulp.src([
		'app/.htaccess'
	]).pipe(gulp.dest('docs'));

	var buildFonts = gulp.src('app/fonts/**/*').pipe(gulp.dest('docs/fonts'));

	var buildJs = gulp.src('app/js/**/*').pipe(gulp.dest('docs/js'));

});

gulp.task('local-deploy', function() {
    var conn = ftp.create({
        host:      'localhost',
        user:      'qunaxis',
        password:  '123123',
        parallel:  10,
        log: gutil.log
    });
    var globs = [
        'docs/**',
        'docs/.htaccess',
    ];
    return gulp.src(globs, {buffer: false})
        .pipe(conn.dest('/'));

});
gulp.task('deploy', function() {
	var conn = ftp.create({
		host:      'shared-18.smartape.ru',
		user:      'user11046_attend',
		password:  'aspirin48',
		parallel:  10,
		log: gutil.log
	});

	var globs = [
	'docs/**',
	'docs/.htaccess',
	];
	return gulp.src(globs, {buffer: false})
	.pipe(conn.dest('/'));

});

gulp.task('clearcache', function () { return cache.clearAll(); });

gulp.task('default', ['watch']);
