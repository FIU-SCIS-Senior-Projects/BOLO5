/* jshint node: true */
'use strict';
var _ = require('lodash');

var systemSettings = require('../domain/systemSettings.js');//pending
var Promise = require('promise');

/** @module core/ports */
module.exports = systemSettingsService;


/**
 * Creates a new instance of {AgencyService}.
 *
 * @class
 * @classdesc Provides an API for client adapters to interact with user facing
 * functionality.
 *
 * @param {AgencyRepository}
 */
function systemSettingsService ( systemSettingsRepository ) {
    this.systemSettingsRepository = systemSettingsRepository;
}


/**
 * Create a new Agency in the system.
 *
 * @param {object} agencyData - Data for the new Agency
 * @param {object} attachments - Agency Attachments
 */
systemSettingsService.prototype.createsystemSettings = function ( systemSettingsData) {
    var systemSettings = new systemSettings(systemSettingsData);
    var validatename = 0;
    var context = this;
    if (!systemSettings.isValid()) {
        //TODO: promise should be returned but it is awaiting correct implemenation of isValid() function
        // return Promise.reject(new Error("ERROR: Invalid agency data."));
        Promise.reject(new Error("ERROR: Invalid System Settings data."));
    }

    return context.findsystemSettingsById(systemSettings.systemSettings_id, systemSettings.name).then(function (results) {
        if (results > 0) {
            return Promise.reject(new Error("ERROR: Settings ID already registered"));
        }
        else {
            return context.systemSettingsRepository.getsystemSettingss('by_systemSettings').then(function (systemSettingss){

                systemSettingss.forEach(function(currentsystemSettings) {
                    if(currentsystemSettings.data.name === systemSettings.data.name ){
                        validatename++;
                    }
                });

                if(validatename<1){

                    return context.systemSettingsRepository.insert(systemSettings)
                    .then(function (value) {
                            return value;
                        })
                        .catch(function (error) {
                            throw new Error('Unable to create System Settings Document.');
                        });
                }
                else{
                    return Promise.reject(new Error("ERROR: System Settigns already registered"));
                }
            });

        }
    });

};


/**
 * Create a new Agency in the system.
 *
 * @param {object} agencyData - Agency to update
 * @param {object} attachments - Agency Attachments
 */
systemSettingsService.prototype.updatesystemSettings = function ( systemSettingsData) {
    var context = this;
    var updated = new systemSettings( systemSettingsData);
    var validatename = 0;

    if ( ! updated.isValid() ) {
        throw new Error( "Invalid settings data" );
    }

     return context.systemSettingsRepository.getsystemSettingss('by_systemSettings').then(function (systemSettingss){

                systemSettingss.forEach(function(currentsystemSettings) {
                    if(currentsystemSettings.data.name === updated.name ){
                        validatename++;
                        if(currentsystemSettings.data.id === updated.id){
                            validatename--;
                        }
                    }
                });

                if(validatename<1){

                    return context.systemSettingsRepository.getsystemSettings( updated.data.id )
                    .then( function ( original ) {


                        original.diff( updated ).forEach( function ( key ) {
                            original.data[key] = updated.data[key];
                        });


                        return context.systemSettingsRepository.update( original);
                    })
                    .then( function ( updated ) {
                        return updated;
                    })
                    .catch( function ( error ) {
                        return Promise.reject( new Error("Settings does not exist.") );
                    });
                }
                else{
                    return Promise.reject(new Error("Settings already registered"));
                }
        });
};

/**
 * Retrieve a collection of agencies
 */
systemSettingsService.prototype.getsystemSettingss = function ( ids ) {
    return this.systemSettingsRepository.getsystemSettingss( ids );
};

systemSettingsService.prototype.getsystemSettings = function ( id ) {
    var context = this;
    return context.systemSettingsRepository.getsystemSettings( id );
};


/**
 * Get an attachment for a specified Agency.
 */

systemSettingsService.formatDTO = formatDTO;
systemSettingsService.prototype.formatDTO = formatDTO;
function formatDTO ( dto ) {
    var newdto = new systemSettings().data;

    Object.keys( newdto ).forEach( function ( key ) {
        newdto[key] = dto[key] || newdto[key];
    });

    return newdto;
}
