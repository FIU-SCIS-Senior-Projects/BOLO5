/* jshint node: true */


var _                   = require('lodash');
var multiparty          = require('multiparty');
var Promise             = require('promise');

var config              = require('../../config');
var formUtil            = require('../../lib/form-util');
var parseFormData       = formUtil.parseFormData;
var systemSettingsRepository    = new config.systemSettingsRepository();
var systemSettingsService       = new config.systemSettingsService( systemSettingsRepository );
var GFERR               = config.const.GFERR;
var GFMSG               = config.const.GFMSG;

/**
 * Respond with a form to create a Data Subscriber.
 *
 *@params req
 *@params res
 *@Author John Burke
 */
module.exports.getSystemSetting = function (req, res) {
    res.render('system-setting');//pending
};


module.exports.postSystemSetting = function (req, res, next) {
  console.log('here');
    parseFormData(req).then(function(formDTO){
      var systemSettingsDTO = systemSettingsService.formatDTO( formDTO.fields );
      var formFields = validateFields(formDTO.fields);

      if(formFields == false){
        req.flash(GFERR, 'No field can be left empty. This information is required');
        res.redirect('back');
        throw new FormError();
      }

      var result = systemSettingsService.createsystemSettings( systemSettingsDTO);
      return Promise.all( [ result, formDTO ] );
  })
  .then(function (pData,error) {
      if(error)
      throw error;

      else {
          if (pData[1].files.length) cleanTemporaryFiles(pData[1].files);
          req.flash(GFMSG, 'Subscriber registration successful.');
          res.redirect('/admin/systemSettings');
      }
  }).catch( function ( error ) {
      req.flash(GFERR, 'Subscriber Creation unsuccessful ' + error);
      res.redirect('back');
      throw new FormError();
  });
};
