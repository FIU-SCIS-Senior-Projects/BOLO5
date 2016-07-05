/* jshint node: true */
'use strict';



var _                   = require('lodash');
var Promise             = require('promise');
var router              = require('express').Router();


var config              = require('../config');
var agencyRepository    = new config.AgencyRepository();
var agencyService       = new config.AgencyService( agencyRepository );


module.exports = router;
router.post(  '/userGuide'                 , postUserGuide );
router.get(  '/userGuide'                 , getUserGuide );


/**
 * This function is to display the user guide on each individual teir.
 *
 * @params req
 * @params res
 */
function postUserGuide(req, res){
    console.log('In the postUserGuide');
    res.render('user-guide');
}


/**
 * This function is to display the user guide on each individual teir.
 *
 * @params req
 * @params res
 */
function getUserGuide(req, res){
    console.log('In the getUserGuide');
    res.render('user-guide');
}
