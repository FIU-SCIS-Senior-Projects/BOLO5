/* jshint node: true */
'use strict';

var _ = require('lodash');
var Entity = require('./entity');


/** @module core/domain */
module.exports = systemSettings;


var schema = {
    'name': {
        'required'  : true,
        'type'      : 'string'
    },
    'loginAttempts': {
        'required'  : true,
        'type'      : 'string'
    },
    'sessionMinutes': {
        'required'  : true,
        'type'      : 'boolean'
    },
    'settings_id':{
        'required'  : true,
        'type'      : 'string'
    }

};

var required = Object.keys( schema ).filter( function ( key ) {
    return schema[key].required;
});

/**
 * Create a new data subscriber object.
 *
 * @class
 * @classdesc Entity object representing a data subscriber.
 *
 * @param {Object} data - Object containing data subscriber Data properties
 */
function systemSettings(data) {
    var systemSettingsTemplate = {
        'id'            : '',
        'name'          : '',
        'loginAttempts'       : '',
        'sessionMinutes'       : '',
        'dataSubscriber_id'     : ''
    };

    this.data = _.extend({}, dataSubscriberTemplate, data);
    Entity.setDataAccessors( this.data, this );
}

systemSettings.prototype.same = function ( other ) {
    return 0 === this.diff( other ).length;
};

/**
 * Checks if the dataSubscriber is valid
 *
 * @returns {bool} true if passes validation, false otherwise
 */
 systemSettings.prototype.isValid = function () {
    var data = this.data;
    var namecheck = typeof data.name;
    var loginAttemptscheck = typeof data.loginAttempts;
    var sessionMinutescheck = typeof data.sessionMinutes;
    var idcheck = typeof data.systemSettings_id;

    return schema.name.type === namecheck &&
      schema.loginAttempts.type === loginAttemptscheck &&
      schema.sessionMinutes.type === sessionMinutescheck &&
      schema.systemSetting_id.type === idcheck;
 };

/**
 * Returns an array of keys differing from the source user object.
 *
 * @param {dataSubscriber} - the other dataSubscriber to compare to
 */
systemSettings.prototype.diff = function ( other ) {
    var source = this;
    return Object.getOwnPropertyNames( source.data )
        .filter( function ( key ) {
            return ! _.isEqual( other.data[key], source.data[key] );
        });
};
