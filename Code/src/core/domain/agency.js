/* jshint node: true */
'use strict';

var _ = require('lodash');
var Entity = require('./entity');


/** @module core/domain */
module.exports = Agency;


var schema = {
    'name': {
        'required'  : true,
        'type'      : 'string'
    },
    'city': {
        'required'  : true,
        'type'      : 'string'
    },
    'state': {
        'required'  : true,
        'type'      : 'string'
    },
    'isActive': {
        'required'  : true,
        'type'      : 'boolean'
    },
    'agency_id':{
        'required'  : true,
        'type'      : 'string'
    },
    'preventUnsubscription': {
        'required'  : true,
        'type'      : 'boolean'
    },

};

var required = Object.keys( schema ).filter( function ( key ) {
    return schema[key].required;
});

/**
 * Create a new Agency object.
 *
 * @class
 * @classdesc Entity object representing an Agency.
 *
 * @param {Object} data - Object containing Agency Data properties
 */
function Agency(data) {
    var agencyTemplate = {
        'id'            : '',
        'name'          : '',
        'address'       : '',
        'city'          : '',
        'state'         : '',
        'zip'           : '',
        'phone'         : '',
        'agency_id'     : '',
        'isActive'      : true,
        'attachments'   : {},
        'domain'        : '',
        'preventUnsubscription':false
    };

    this.data = _.extend({}, agencyTemplate, data);
    Entity.setDataAccessors( this.data, this );
}

Agency.prototype.same = function ( other ) {
    return 0 === this.diff( other ).length;
};

/**
 * Checks if the agency is valid
 *
 * @returns {bool} true if passes validation, false otherwise
 */
 Agency.prototype.isValid = function () {
    var data = this.data;
    var namecheck = typeof data.name;
    var citycheck = typeof data.city;
    var statecheck = typeof data.state;
    var isactivecheck = typeof data.isActive;
    var idcheck = typeof data.agency_id;

    return schema.name.type === namecheck &&
      schema.city.type === citycheck &&
      schema.state.type === statecheck &&
      schema.isActive.type === isactivecheck &&
      schema.agency_id.type === idcheck;
 };

/**
 * Returns an array of keys differing from the source user object.
 *
 * @param {Agency} - the other agency to compare to
 */
Agency.prototype.diff = function ( other ) {
    var source = this;
    return Object.getOwnPropertyNames( source.data )
        .filter( function ( key ) {
            return ! _.isEqual( other.data[key], source.data[key] );
        });
};
