/* jshint node: true */
'use strict';

var _ = require('lodash');
var fs = require('fs');
var Promise = require('promise');
var uuid = require('node-uuid');
var path = require('path');

var db = require('../../lib/cloudant-promise').db.use('bolo');
var Agency = require('../../domain/agency.js');
var ImageService = require('../../service/image-service');
var imageService = new ImageService();

var config          = require('../../../web/config');
var DOCTYPE = 'agency';


module.exports = CloudantAgencyRepository;


/**
 * Transform the agency doc to a suitable format for the Agency entity object.
 *
 * @param {Object} - the doc to transform to an agency
 * @returns {Agency} - an agency in the generic Agency entity format
 * @private
 */
function agencyFromCloudant(agency_doc) {
    var agency = new Agency(agency_doc);

    agency.data.id = agency.data._id;
    delete agency.data._id;
    delete agency.data._rev;
    delete agency.data.Type;

    if (agency.data._attachments) {
        agency.data.attachments = agency.data._attachments;
        delete agency.data._attachments;
    }

    return agency;
}

/**
 * Transform the agency to a format suitable for cloudant.
 *
 * @param {Agency} - the agency to transform
 * @returns {Object} - an object suitable for Cloudant
 * @private
 */
function agencyToCloudant(agency) {
    var doc = _.assign({}, agency.data);

    doc.Type = DOCTYPE;

    if ( doc.id ) {
        doc._id = doc.id;
        delete doc.id;
    }

    if ( agency.data.attachments ) {
        doc._attachments = _.assign( {}, agency.data.attachments );
        delete doc.attachments;
    }

    return doc;
}


function createAgencyID() {
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
function transformAttachment(original) {
    var readFile = Promise.denodeify(fs.readFile);

    var createDTO = function (readBuffer) {
        return {
            'name': original.name,
            'content_type': original.content_type,
            'data': readBuffer
        };
    };

    var errorHandler = function (error) {
        throw new Error('transformAttachment: ', error);
    };

    return readFile(original.path)
        .then(createDTO)
        .catch(errorHandler);
}


/**
 * Create a new CloudantAgencyRepository object.
 *
 */
function CloudantAgencyRepository() {
    // constructor stub
}

/**
 * Insert an agency document in the Cloudant Database
 *
 * @param {Object} - agency to store
 * @param {Object} - attachments of the agency
 */
CloudantAgencyRepository.prototype.insert = function (agency, attachments) {
    var context = this;
    console.log('calling insert');
    var atts = attachments || [];
    var newdoc = agencyToCloudant(agency);
    newdoc._id = createAgencyID();

  /*    return Promise.all(atts.map(transformAttachment))
        .then(function (attDTOs) {
            if (attDTOs.length) {
                return db.insertMultipart(newdoc, attDTOs, newdoc._id);
            } else {
                return db.insert(newdoc, newdoc._id);
            }
        })
        .then(function (response) {
            if (!response.ok) throw new Error(response.reason);
            return context.getAgency(response.id);
        })
        .catch(function (error) {
            throw new Error(
                'Unable to create new document: ' + error.reason
                );
        });*/
      //  var atts = _.map(attachments, attachmentsToCloudant);
        return Promise.all(atts.map(transformAttachment)).then(function (attDTOs) {
            if (attDTOs.length) {

                console.log('in method');
                var need_comp_attDTOs = [];
                for (var i = 0; i < attDTOs.length; i++) {
                    if (attDTOs[i].data.length > config.const.MAX_IMG_SIZE) {

                        Array.prototype.push.apply(need_comp_attDTOs,attDTOs.splice(i));

                    }

                }

                if (need_comp_attDTOs.length) {
                console.log('need compression');
                var comp_atts = _.map(need_comp_attDTOs, imageService.compressImageFromBuffer);

                return Promise.all(comp_atts).then(function (comp_attDTOs) {

                    Array.prototype.push.apply(comp_attDTOs,attDTOs);

                    return db.insertMultipart(newdoc, comp_attDTOs, newdoc._id);
                });
            }
                else  return db.insertMultipart(newdoc, attDTOs, newdoc._id);
            }
            else {
                return db.insert(newdoc, newdoc._id);
            }
            }).catch(function (error) {
                throw new Error(
                    'Unable to create new document: ' + error.reason
                    );
            });
}

/**
 * Updates an agency
 *
 * @param {Agency} - the agency to update
 * @param {Attachments} - the attachments belonging to that agency
 */
CloudantAgencyRepository.prototype.update = function ( agency, attachments ) {
    var agencyToUpdate = agencyToCloudant( agency );
    var atts = attachments || [];

    var currentAgencyRev = db.get( agency.data.id );
    var attsPromise = Promise.all( atts.map( transformAttachment ) );

    return Promise.all([ currentAgencyRev, attsPromise ])
        .then( function ( data ) {
            var doc = data[0],
                attDTOs = data[1];

            agencyToUpdate._rev = doc._rev;
            agencyToUpdate._attachments = doc._attachments || {};

            if (attDTOs.length) {

                console.log('in method');
                var need_comp_attDTOs = [];
                for (var i = 0; i < attDTOs.length; i++) {
                    if (attDTOs[i].data.length > config.const.MAX_IMG_SIZE) {

                        Array.prototype.push.apply(need_comp_attDTOs,attDTOs.splice(i));

                    }

                }

                if (need_comp_attDTOs.length) {
                console.log('need compression');
                var comp_atts = _.map(need_comp_attDTOs, imageService.compressImageFromBuffer);

                return Promise.all(comp_atts).then(function (comp_attDTOs) {

                    Array.prototype.push.apply(comp_attDTOs,attDTOs);

                    return db.insertMultipart(agencyToUpdate, comp_attDTOs, agencyToUpdate._id);
                });
            }
                else  return db.insertMultipart(agencyToUpdate, attDTOs, agencyToUpdate._id);
            } else {
                return db.insert( agencyToUpdate );
            }
        })
        .then( function ( response ) {
            if ( !response.ok ) throw new Error( 'Unable to update AGENCY' );
            return Promise.resolve( agencyFromCloudant( agencyToUpdate ) );
        })
        .catch( function ( error ) {
            return Promise.reject( error );
        });
};

/**
 * Retrieve an agency document from the Cloudant Database
 *
 * @param {int} - agency id
 */
CloudantAgencyRepository.prototype.getAgency = function (id) {
    return db.get(id)
        .then(function (agency_doc) {
            return agencyFromCloudant(agency_doc);
        })
        .catch( function ( error ) {
            return Promise.reject( new Error("Agency does not exist.") );
        });
};

/**
 * Retrieve a collection of agencies from the cloudant database
 */
CloudantAgencyRepository.prototype.getAgencies = function ( ids ) {
    var opts = { 'include_docs': true };
    var view = 'by_agency';

    if ( _.isArray( ids ) ) {
        view = 'all_active';
        opts.keys = ids;
    }
    return db.view( 'agency', view, opts ).then( function ( result ) {
        var agencies = result.rows.map( function ( row ) {
            return agencyFromCloudant( row.doc );
        });
        return agencies;
    });
};

CloudantAgencyRepository.prototype.getAttachment = function ( id, attname ) {
    var bufferPromise = db.getAttachment( id, attname );
    var docPromise = db.get( id );

    return Promise.all([ bufferPromise, docPromise ])
    .then( function ( data ) {
        var buffer = data[0];
        var attinfo = data[1]._attachments[attname];

        return {
            'name': attname,
            'content_type': attinfo.content_type,
            'data': buffer
        };
    });
};

CloudantAgencyRepository.prototype.searchAgencies = function (query_string) {

    var query_obj =
    {
        q : query_string,
        include_docs: true
    };

    return db.search( 'agency', 'agencies', query_obj).then( function (result ) {

            console.log('Showing %d out of a total %d agencies found', result.rows.length, result.total_rows);
            for (var i = 0; i < result.rows.length; i++) {
                console.log('Document id: %s', result.rows[i].id);
            }
        var agencies = _.map( result.rows, function ( row ) {

            return agencyFromCloudant( row.doc );
        });
        return { 'agencies': agencies, total: result.total_rows };
        });
};


CloudantAgencyRepository.prototype.findAgencyById = function (id) {

   var selector = {selector:{agency_id:id}};
   var result = 0;

   return db.find(selector).then( function (id_result ) {

       console.log('Found %d documents with agency id: ' + id, id_result.docs.length);
       for (var i = 0; i < id_result.docs.length; i++) {
           console.log('  Doc id: %s', id_result.docs[i]._id);
       }
       return id_result.docs.length;
   });

};

CloudantAgencyRepository.prototype.delete = function ( id ) {
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
            'Failed to delete Agency: ' + error.error + ' / ' + error.reason
        );
    });
};
