/* jshint node: true */


var _                   = require('lodash');
var multiparty          = require('multiparty');
var Promise             = require('promise');

var config              = require('../../config');

/**
 * Respond with a form to create a Data Subscriber.
 */
module.exports.getDataAnalysis = function (req, res) {
    res.render('data-analysis');//pending
};
