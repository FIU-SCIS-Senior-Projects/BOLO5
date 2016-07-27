/* jshint node: true */
'use strict';

var _               = require('lodash');
var http            = require('http');
var path            = require('path');

var express         = require('express');
var cookieParser    = require('cookie-parser');
var errorHandler    = require('errorhandler');
var expressSession  = require('express-session');
var ios             = require('socket.io-express-session');
var favicon         = require('serve-favicon');
var flash           = require('connect-flash');
var logger          = require('morgan');
var methodOverride  = require('method-override');
var config          = require('./config');
var routes          = require('./routes');
var auth            = require('./lib/auth.js');
var bodyParser      = require('body-parser');
var GFMSG           = config.const.GFMSG;
var GFERR           = config.const.GFERR;

var boloRepository    = new config.BoloRepository();
var boloService      = new config.BoloService(boloRepository );
/*
 * Express Init and Config
 */
var app = express();
app.set( 'port', process.env.PORT || 3000 );
app.set( 'views', path.join( __dirname, 'views' ) );
app.set( 'view engine', 'jade' );
app.disable( 'x-powered-by' ); /** https://www.youtube.com/watch?v=W-8XeQ-D1RI **/

var inDevelopmentMode = ( 'development' == app.get( 'env' ) );
var secretKey = new Buffer( process.env.SESSION_SECRET || 'secret' ).toString();


/*
 * Global Middleware
 */
if ( inDevelopmentMode ) {
    app.use( logger( 'dev' ) );
    app.use( errorHandler() );
}

app.use( favicon( path.join( __dirname, '/public/favicon.ico' ) ) );
app.use( express.static( path.join( __dirname, 'public' ) ) );
app.use('/bower_components', express.static(path.join(__dirname, 'bower_components')));
app.use( methodOverride() );
app.use( cookieParser( secretKey ) );
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var session = expressSession({
    'secret': secretKey,
    /** @todo confirm the next two options **/
    'resave': true,
    'saveUninitialized': true,
    'proxy': true,
    'cookie': {
        path: '/',
        httpOnly: true,
        secure: false,
        maxAge: config.max_age
    },
    'rolling': true
    /**
     * @todo Uncomment the below option before going to production. HTTPS is
     * required for this option or the cookie will not be set per the
     * documentation.
     */
     //'cookie': { secure: true }
});
app.use(session);

app.use( flash() );
app.use( auth.passport.initialize() );
app.use( auth.passport.session() );


/*
 * Application Locals
 */
app.locals._ = _;
app.locals.config_bootstrap = config.bootstrap;


/*
 * Routes
 */
var isAuthenticated = function ( req, res, next ) {
    if ( req.isAuthenticated() ) {
        next();
    } else {
        req.session.login_redirect = req.originalUrl;
        res.redirect( '/login' );
    }
};


app.use( function ( req, res, next ) {
    if ( req.user ) {
        res.locals.userLoggedIn = true;
        res.locals.username = req.user.username;
        res.locals.tier = req.user.roleName();
    }
    next();
});

app.use( function ( req, res, next ) {
    res.locals.g_err = req.flash( GFERR );
    res.locals.g_msg = req.flash( GFMSG );
    next();
});

/** https://www.youtube.com/watch?v=W-8XeQ-D1RI **/
app.use( function ( req, res, next ) {
    res.setHeader('Access-Control-Allow-Origin', "http://"+req.headers.host);

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader( 'X-Frame-Options', 'sameorigin' );
    next();
});

/*
 * TODO
 * To be uncommented when going into production. This ensures that the site
 * is always using https
 */
// app.use (function (req, res, next) {
//    var schema = (req.headers['x-forwarded-proto'] || '').toLowerCase();
//    if (schema === 'https') {
//      next();
//    } else {
//      res.redirect('https://' + req.headers.host + req.url);
//    }
//  });
//

app.get( '/', isAuthenticated, function ( req, res, next ) {
    res.redirect( '/bolo' );
});

app.use( auth.router );
app.use( routes.aboutUs);                       // Author John Burke
app.get( '/bolo/asset/:boloid/:attname', routes.bolos.getAttachment );
app.use( isAuthenticated, routes.bolos );
app.use( isAuthenticated, routes.account );
app.use( isAuthenticated, routes.agency );
app.use( isAuthenticated, routes.admin );
app.use( isAuthenticated, routes.userGuide);    // Author John Burke
app.use( function( req, res, next ) {
    console.error(
        '404 encountered at %s, request ip = %s', req.originalUrl, req.ip
    );
    res.status(404).render( '404' );
});

/*
 * Error Handling
 */
if ( inDevelopmentMode ) {
    app.use( function( err, req, res, next ) {
        console.error( 'Error occurred at %s >>> %s', req.originalUrl, err.message );
        res.render( 'error', { message: err.message, error: err } );
    });
} else {
    app.use( function( err, req, res, next ) {
        console.error( 'Error occurred at %s >>> %s', req.originalUrl, err.message );
        req.flash( GFERR, 'Internal server error occurred, please try again' );
        res.redirect( 'back' );
    });
}

/*
 * Server Start
 */
var server = http.createServer( app );

server.listen( app.get( 'port' ), function() {
    console.log( 'Express server listening on port ' + app.get( 'port' ) );
});
