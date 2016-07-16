/* jshint node: true */


var _                   = require('lodash');
var multiparty          = require('multiparty');
var Promise             = require('promise');

var config              = require('../../config');

/**
 * Respond with a form to create a Data Subscriber.
 */
module.exports.getSystemSetting = function (req, res) {
    res.render('system-setting');//pending
};
