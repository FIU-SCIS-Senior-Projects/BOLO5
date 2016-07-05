/* jshint node: true */
'use strict';



var _                   = require('lodash');
var Promise             = require('promise');
var router              = require('express').Router();


var config              = require('../config');
var agencyRepository    = new config.AgencyRepository();
var agencyService       = new config.AgencyService( agencyRepository );


module.exports = router;
router.get(  '/aboutUs'                 , getAboutUs );


/**
 * This function is to display the user guide on each individual teir.
 *
 * @params req
 * @params res
 */
function getAboutUs(req, res){
    console.log('In the getAboutUs');
    res.render('about-us');
}
