/* jshint node: true */
'use strict';

var _ = require('lodash');
var fs = require('fs');
var Promise = require('promise');
var uuid = require('node-uuid');
var path = require('path');

var db = require('../../lib/cloudant-promise').db.use('bolo');
var systemSettings = require('../../domain/systemSettings.js');

var DOCTYPE = 'systemSettings';


module.exports = CloudantsystemSettingsRepository;


/**
 * Transform the data subscriber doc to a suitable format for the data subscriber entity object.
 *
 * @param {Object} - the doc to transform to an agency
 * @returns {Data Subscriber} - a data subscriber in the generic data subscriber entity format
 * @private
 */
function systemSettingsFromCloudant(systemSettings_doc) {
    var systemSettings = new systemSettings(systemSettings_doc);
    systemSettings.data.id = systemSettings.data._id;
    delete systemSettings.data._id;
    delete systemSettings.data._rev;
    delete systemSettings.data.Type;


    return systemSettings;
}

/**
 * Transform the data subscriber to a format suitable for cloudant.
 *
 * @param {systemSettings} - the data subscriber to transform
 * @returns {Object} - an object suitable for Cloudant
 * @private
 */
function systemSettingsToCloudant(systemSettings) {
    var doc = _.assign({}, systemSettings.data);

    doc.Type = DOCTYPE;

    if ( doc.id ) {
        doc._id = doc.id;
        delete doc.id;
    }


    return doc;
}


function createsystemSettingsID() {
    var id = uuid.v4().replace(/-/g, '');
    return id;
}

/**
 * Transform attachment DTOs to the Cloudant attachment DTO fomat
 *
 * @param {Object} - an attachment DTO
 * @returns {Promise|Object} - Promise resolving to the transformed DTO
 * @private
 */



/**
 * Create a new CloudantsystemSettingsRepository object.
 *
 */
function CloudantsystemSettingsRepository() {
    // constructor stub
}

/**
 * Insert a data subscriber document in the Cloudant Database
 *
 * @param {Object} - data subscriber to store
 * @param {Object} - attachments of the data subscriber
 */
CloudantsystemSettingsRepository.prototype.insert = function (systemSettings) {
    var context = this;
    var newdoc = systemSettingsToCloudant(systemSettings);
    newdoc._id = createsystemSettingsID();
    return  db.insert(newdoc, newdoc._id)
        .then(function (response) {
            if (!response.ok){console.log(response.ok); throw new Error(response.reason);}
            return context.getsystemSettings(response.id);
        })
        .catch(function (error) {
          console.log(error.reason);
            throw new Error(
                'Unable to create new document: ' + error.reason
                );
        });
};

/**
 * Updates a data subscriber
 *
 * @param {Agency} - the data subscriber to update
 * @param {Attachments} - the attachments belonging to that data subscriber
 */
CloudantsystemSettingsRepository.prototype.update = function ( systemSettings ) {
    var systemSettingsToUpdate = systemSettingsToCloudant( systemSettings );


    var currentsystemSettingsRev = db.get( systemSettings.data.id );

    return Promise.all([ currentsystemSettingsRev ])
        .then( function ( data ) {
            var doc = data[0]

            systemSettingsToUpdate._rev = doc._rev;



            return db.insert( systemSettingsToUpdate );

        })
        .then( function ( response ) {
            if ( !response.ok ) throw new Error( 'Unable to update System Settings' );
            return Promise.resolve( systemSettingsFromCloudant( systemSettingsToUpdate ) );
        })
        .catch( function ( error ) {
            return Promise.reject( error );
        });
};

/**
 * Retrieve an data subscriber document from the Cloudant Database
 *
 * @param {int} - data subscriber id
 */


CloudantsystemSettingsRepository.prototype.getsystemSettings = function (id) {
    return db.get(id)
        .then(function (systemSettings_doc) {
            return systemSettingsFromCloudant(systemSettings_doc);
        })
        .catch( function ( error ) {
            return Promise.reject( new Error("Settings document does not exist.") );
        });
};





CloudantsystemSettingsRepository.prototype.delete = function ( id ) {
    // **UNDOCUMENTED BEHAVIOR**
    // cloudant/nano library destroys the database if a null/undefined argument
    // is passed into the `docname` argument for `db.destroy( docname,
    // callback)`. It seems that passing null to the object provided by
    // `db.use( dbname )` creates the equivalent database API requests, i.e.
    // create/read/delete database.
    if ( !id ) throw new Error( 'id cannot be null or undefined' );

    return db.get( id ).then( function ( doc ) {
        return db.destroy( doc._id, doc._rev );
    })
    .catch( function ( error ) {
        return new Error(
            'Failed to delete System Settings document: ' + error.error + ' / ' + error.reason
        );
    });
};
