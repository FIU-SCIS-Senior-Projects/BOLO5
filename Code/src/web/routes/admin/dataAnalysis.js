/* jshint node: true */


var _                   = require('lodash');
var multiparty          = require('multiparty');
var Promise             = require('promise');
var json2csv            = require('json2csv');
var fs                  = require('fs');

var all_fields          =['id','agency','agencyName','author','category',
                          'firstName','lastName','dob','dlNumber','address','zipCode',
                          'race','sex','height','weight','hairColor','tattoos',
                          'vehicleMake','vehicleModel','vehicleColor','vehicleYear',
                          'vehicleStyle','vehicleLicenseState','vehicleLicensePlate',
                          'vehicleIdNumber','boatYear','boatManufacturer','boatModel',
                          'boatType','boatLength','boatColor','boatHullIdNumber',
                          'boatRegistrationNumberSt','boatRegistrationNumberNu',
                          'propulsion','propulsionType','propulsionMake','trailer',
                          'trailerManufacturer','trailerVIN','trailerTagLicenseState',
                          'trailerTagLicenseNumber','timeReported','dateReported',
                          'timeRecovered','dateRecovered','addressRecovered',
                          'zipCodeRecovered','agencyRecovered','additional',
                          'summary','Type','record','isActive'];

var config              = require('../../config');
var boloService         =new config.BoloService(new config.BoloRepository());

/**
 * Respond with a form to create a Data Subscriber.
 */
module.exports.getDataAnalysis = function (req, res) {
    res.render('data-analysis');//pending
};

module.exports.downloadCsv=function(req,res){
      boloService.getBolos().then(function(results){

          return json2csv({data: results.bolos, fields:all_fields})
      }).then(function(file){
              res.setHeader('Content-Type', 'text/csv');
              res.setHeader('Content-Disposition', 'attachment; filename=bolos.csv');
              res.send(file);
      }).catch(function(err){
        console.log(err);
      })

}
