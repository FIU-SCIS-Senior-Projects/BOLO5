'use strict';
var _ = require('lodash');
var Promise = require('promise');

function PDFService() {

}


/**
 * This function builds the user guide according to the user's tier.
 * tier 4 === ROOT
 * tier 3 === ADMINSTRATION
 * tier 2 === SUPERVISOR
 * tier 1 === OFFICER
 *
 *@params user
 *@params doc
 */
PDFService.prototype.genUserGuide = function(user, doc) {
    var INTRO = "   logging in you will be brought to the home page. This is where you will be "
        + "able to view your BOLOs. Each BOLO has several buttons on it that will be "
        + "explained later. From the home page, you will see several other links across "
        + "the top (mobile will be in a dropdown menu accessible from the top right corner) "
        + "of your screen). These links will also be explained shortly and include a drop "
        + "down menu to Create BOLO, Archive, Agency Directory, Search, Admin for the "
        + "Administration and root users, a dropdown for user setting and a dropdown to "
        + "Filter by Agency";

    var USER_MANAGENT = "  1) Click on 'Admin'\n"
        + "  2) Click on 'User Management'\n"
        + "  3) Click on 'Add New User'\n"
        + "  4) Fill in the empty fields\n"
        + "  5) Click 'Submit'\n";

    var AGENCY_MANAGMENT = "  1) Click on 'Admin'\n"
        + "  2) Click on 'Agency Management'\n"
        + "  3) Click on 'Add new agency'\n"
        + "  4) Fill in empty fields\n"
        + "  5) Select new agency logo and shield images\n"
        + "  6) Click 'Submit'\n";

    var DATA_SUBSCRIBER = "  1) Click on 'Admin'\n"
        + "  2) Click on 'Data Subscriber'\n"
        + "  3) Click on 'Add New Data Subscriber'\n"
        + "  4) Fill in data subscriber's ID, Name and email\n"
        + "  5) Click 'Submit'\n";

    // system settings here
    // var SYSTEM_SETTING = "";

    var CREATE_BOLO = "  1) Click 'Create BOLO' and select the type of BOLO you would like to create.\n"
        + "  2) Fill in required fields.\n"
        + "  3) Select available images.\n"
        + "  4) Add a video link (if available)\n"
        + "  5) Add a summery.\n"
        + "  6) Click the 'Preview' Button to make sure you have added everything.\n"
        + "  7) Click 'Back to Create BOLO' to go back to the BOLO.\n"
        + "  8) Repeat Steps 2 - 7 until all information is complete.\n"
        + "  9) Click 'Submit' to submit your BOLO.\n"
        + "  10) Goto to your registered email and click on the confirmation link.\n";

    var EDIT = "  1) Click on 'Edit'\n"
        + "  2) Select any field you want to edit\n"
        + "  3) Enter any information required\n"
        + "  4) Click 'Submit'\n";

    var DETAILS = "  1) Click on 'Details'\n"
        + "  2) Review details of a selected BOLO\n"
        + "  3) Click 'Back' to go back to the BOLOs\n"

    var ARCHIVE_ALL = "  You may view archived BOLOs just in case "
        + "you are looking for someone who fits the description of "
        + "another crime.\n";

    var ARCHIVE_ADMIN = "  1) Click on 'Archive'\n"
        + "  2) The Bolo will be moved into the archived BOLOs\n"
        + "  3) At this point you may 'Restore', 'Delete' or 'Purge' the BOLO\n";

    var DATA_SUBSCRIBER = "Each BOLO has three options that you may change'\n"
        + "  1) Status'\n"
        + "  2) Restore'\n"
        + "  3) Delete'\n";

    var AGENCY_VIEW = "  1) Click on agency to view a list of partnering agencies.\n"
        + "  2) Select an agency and view contact information or verify the "
        + "agency's 'Logo' and 'Shield.'\n";

     var SEARCH = "  1) Select any field(s) you wish to search.\n"
        + "  2) Enter information value of field(s).\n"
        + "  3) Wild card search is for something you can not search with an "
        + "optional search.\n"
        + "  4) Click 'Search'\n";

    var FILTER = "  1) Click on 'Details'\n"
    + "  2) Review details of a selected BOLO\n"
    + "  3) Click 'Home' to go back to the BOLOs\n";

    // Introduction for tier levels
    doc.image('../web/public/img/BOLObanner.jpg', 10, 10,{scale: 1.0});
    doc.fillColor('red');
    doc.text("UNCLASSIFIED// FOR OFFICIAL LAW ENFORCEMENT USE ONLY", 100, 200,{align: 'center'})
        .moveDown(.5);
    doc.fillColor('black');
    doc.font('Times-Roman');
    doc.fontSize(15);
    doc.text("Introduction",{align: 'center'}).moveDown(0.5);
    doc.fontSize(12);
    doc.text(INTRO,{align: 'left'}).moveDown(2);

    // print for root and admin
    if ( user.tier === 4  || user.tier === 3 ){

        // User management
        doc.fontSize(15);
        doc.text("User Management").moveDown(0.25);
        doc.fontSize(12);
        doc.text(USER_MANAGENT, {align: 'left'}).moveDown();
    }


    // print for root
    if ( user.tier === 4){

        // agency management
        doc.fontSize(15);
        doc.text("Agencgy Management").moveDown(0.25);
        doc.fontSize(12);
        doc.text(AGENCY_MANAGMENT, {align: 'left'}).moveDown();

        // Data Subscriber
        doc.fontSize(15);
        doc.text("Data Subscriber").moveDown(0.25);
        doc.fontSize(12);
        doc.text(DATA_SUBSCRIBER, {align: 'left'}).moveDown();

        // system setting here
        //doc.fontSize(15);
        //doc.text("System Settings").moveDown(0.25);
        //doc.fontSize(12);
        //doc.text(SYSTEM_SETTING, {align: 'left'}).moveDown();
    }

    // print for ALL user
    // Create BOLO
    doc.fontSize(15);
    doc.text("Create a BOLO").moveDown(0.25);
    doc.fontSize(12);
    doc.text(CREATE_BOLO, {align: 'left'}).moveDown();

    // Edit
    doc.fontSize(15);
    doc.text("Edit").moveDown(0.25);
    doc.fontSize(12);
    doc.text(EDIT, {align: 'left'}).moveDown();

    // Details (link at bottom of BOLO)
    doc.fontSize(15);
    doc.text("Details").moveDown(0.25);
    doc.fontSize(12);
    doc.text(DETAILS, {align: 'left'}).moveDown();

    // Archive (link at the top)
    doc.fontSize(15);
    doc.text("Archive").moveDown(0.25);
    doc.fontSize(12);
    doc.text(ARCHIVE_ALL, {align: 'left'}).moveDown();

    // print for admin and root
    if ( user.tier === 4 || user.tier === 3 ){

        // Archive (link at bottom of BOLO)
        doc.fontSize(15);
        doc.text("Archive (Admin)").moveDown(0.25);
        doc.fontSize(12);
        doc.text(ARCHIVE_ADMIN, {align: 'left'}).moveDown();

        // Data Subscriber
        doc.fontSize(15);
        doc.text("Data Subscriber", {align: 'left'}).moveDown(0.25);
        doc.fontSize(12);
        doc.text(DATA_SUBSCRIBER, {align: 'left'}).moveDown();
    }


    // Agency
    doc.fontSize(15);
    doc.text("Agency").moveDown(0.25);
    doc.fontSize(12);
    doc.text(AGENCY_VIEW, {align: 'left'}).moveDown();

    // Search
    doc.fontSize(15);
    doc.text("Search").moveDown(0.25);
    doc.fontSize(12);
    doc.text(SEARCH, {align: 'left'}).moveDown();

    // Filter by Agency
    doc.fontSize(15);
    doc.text("FIlter by Agency").moveDown(0.25);
    doc.fontSize(12);
    doc.text(FILTER, {align: 'left'}).moveDown();

    return doc;
}

/**
 *
 */
PDFService.prototype.genDetailsPdf = function(doc, data) {
    doc.fontSize(8);
    doc.fillColor('red');
    doc.text("UNCLASSIFIED// FOR OFFICIAL USE ONLY// LAW ENFORCEMENT SENSITIVE", 120, 15)
        .moveDown(0.25);
    doc.fillColor('black');
    doc.text(data.agency.name + " Police Department")
        .moveDown(0.25);
    doc.text(data.agency.address)
        .moveDown(0.25);
    doc.text(data.agency.city + ", " + data.agency.state + ", " + data.agency.zip)
        .moveDown(0.25);
    doc.text(data.agency.phone)
        .moveDown(0.25);
    doc.fontSize(20);
    doc.fillColor('red');
    doc.text(data.bolo.category, 0, 115, {align: 'center'})
        .moveDown();
    doc.fontSize(11);

    // this will display the status only if it is not New
    if(data.bolo.status !== "New"){
        doc.fillColor('red');
        doc.text(data.bolo.status, 100, 140, {align: 'left'})
            .moveDown();
    }
    doc.fillColor('black');
    doc.fontSize(11);
    doc.font('Times-Roman')
        .text("Bolo ID: " + data.bolo.id, 300)
        .moveDown();

    if(data.bolo.category === "THEFT - AUTO"){  //PDF for theft - auto

        // Display year only if there is a value in it
        if(data.bolo['vehicleYear'] !== ""){
            doc.font('Times-Roman')
                .text("Year: " + data.bolo['vehicleYear'], 300)
                .moveDown();
        }

        // Display make only if there is a value in it
        if(data.bolo.vehicleMake !== ""){
                doc.font('Times-Roman')
                    .text("Make: " + data.bolo.vehicleMake, 300)
                    .moveDown();
        }

        // Display Model only if there is a value in it
        if(data.bolo.vehicleModel !== ""){
                doc.font('Times-Roman')
                    .text("Model: " + data.bolo.vehicleModel, 300)
                    .moveDown();
        }

        // Display trim only if there is a value in it
        if(data.bolo['vehicleTrim'] !== ""){
            doc.font('Times-Roman')
                .text("Type: " + data.bolo['vehicleTrim'], 300)
                .moveDown();
        }

        // Display color only if there is a value in it
        if(data.bolo['vehicleColor'] !== ""){
            doc.font('Times-Roman')
                .text("Color: " + data.bolo['vehicleColor'], 300)
                .moveDown();
        }

        // Display License Plate only if there is a value in it
        if(data.bolo['vehicleLicensePlate'] !== "" ){
            doc.font('Times-Roman')
                .text("License Plate: " + data.bolo['vehicleLicensePlate'], 300)
                .moveDown();
        }

        // Display VIN only if there is a value in it
        if(data.bolo['vehicleIdNumber'] !== ""){
            doc.font('Times-Roman')
                .text("Identification Number (VIN): " + data.bolo['vehicleIdNumber'], 300)
                .moveDown();
        }
    }
    else if(data.bolo.category === "THEFT - BOAT"){  //PDF for theft - boatMake

    //VESSEL
        //Display tittle VESSEL
        doc.fillColor('red');
        doc.fontSize(11);
        doc.font('Times-Roman')
            .text("VESSEL", 300)
            .moveDown();
        doc.fillColor('black');

        // Display Year only if there is a value in it
        if(data.bolo['boatYear'] !== ""){
            doc.font('Times-Roman')
                .text("Year: " + data.bolo['boatYear'], 300)
                .moveDown();
        }

        // Display Make only if there is a value in it
        if(data.bolo.boatManufacturer !== ""){
            doc.font('Times-Roman')
                .text("Manufacturer: " + data.bolo.boatManufacturer, 300)
                .moveDown();
        }

        // Display Model only if there is a value in it
        if(data.bolo.boatType !== ""){
            doc.font('Times-Roman')
                .text( "Type:" + data.bolo.boatType, 300)
                .moveDown();
        }

        // Display Length only if there is a value in it
        if(data.bolo['boatLength'] !== ""){
            doc.font('Times-Roman')
                .text("Length: " + data.bolo['boatLength'], 300)
                .moveDown();
        }

        // Display Color only if there is a value in it
        if(data.bolo['boatColor'] !== ""){
            doc.font('Times-Roman')
                .text("Color: " + data.bolo['boatColor'], 300)
                .moveDown();
        }

        // Display HIN only if there is a value in it
        if(data.bolo['boatHullIdNumber'] !== ""){
            doc.font('Times-Roman')
                .text("Hull Identification Number (HIN): " + data.bolo['boatHullIdNumber'], 300)
                .moveDown();
        }

        // Display Registration Number only if there is a value in it
        if(data.bolo['boatRegistrationNumberSt'] !== "" || data.bolo['boatRegistrationNumberNu'] !== ""){
            doc.font('Times-Roman')
                .text("Registration Number: " + data.bolo['boatRegistrationNumberSt'] + data.bolo['boatRegistrationNumberNu'], 300)
                .moveDown();
        }

        //Display tittle PROPULSION
        doc.fillColor('red');
        doc.fontSize(11);
        doc.font('Times-Roman')
            .text("PROPULSION", 300)
            .moveDown();
        doc.fillColor('black');

        // Display Propulsion only if there is a value in it
        if(data.bolo['propulsion'] !== ""){
            doc.font('Times-Roman')
                .text("Propulsion: " + data.bolo['propulsion'], 300)
                .moveDown();
        }

        // Display Type only if there is a value in it
        if(data.bolo['propulsionType'] !== ""){
            doc.font('Times-Roman')
                .text("Type: " + data.bolo['propulsionType'], 300)
                .moveDown();
        }

        // Display Make only if there is a value in it
        if(data.bolo['propulsionMake'] !== ""){
            doc.font('Times-Roman')
                .text("Make: " + data.bolo['propulsionMake'], 300)
                .moveDown();
        }

        // Display Model only if there is a value in it
        if(data.bolo['propulsionModel'] !== ""){
            doc.font('Times-Roman')
                .text("Model: " + data.bolo['propulsionModel'], 300)
                .moveDown();
        }

        // Display Serial Number only if there is a value in it
        if(data.bolo['propulsionSerialNumber'] !== ""){
            doc.font('Times-Roman')
                .text("Serial Number: " + data.bolo['propulsionSerialNumber'], 300)
                .moveDown();
        }

            //Display tittle TRAILER
            doc.fillColor('red');
            doc.fontSize(11);
            doc.font('Times-Roman')
                .text("TRAILER", 300)
                .moveDown();
            doc.fillColor('black');

            // Display Trailer only if there is a value in it
            if(data.bolo['trailer'] !== ""){
                doc.font('Times-Roman')
                    .text("Trailer: " + data.bolo['trailer'], 300)
                    .moveDown();
            }

            // Display Manufacturer only if there is a value in it
            if(data.bolo['trailerManufacturer'] !== ""){
                doc.font('Times-Roman')
                    .text("Manufacturer: " + data.bolo['trailerManufacturer'], 300)
                    .moveDown();
            }

            // Display Vehicle ID Number only if there is a value in it
            if(data.bolo['trailerVIN'] !== ""){
                doc.font('Times-Roman')
                    .text("Vehicle ID Number: " + data.bolo['trailerVIN'], 300)
                    .moveDown();
            }

            // Display Tag License Plate only if there is a value in it
            if(data.bolo['trailerTagLicenseState'] !== "" || data.bolo['trailerTagLicenseNumber'] !== ""){
                doc.font('Times-Roman')
                    .text("Tag License Plate: " + data.bolo['trailerTagLicenseState'] + data.bolo['trailerTagLicenseNumber'], 300)
                    .moveDown();
            }
    }
    else {  //PDF for general bolo

        doc.font('Times-Roman')
            .text("Name: " + data.bolo.firstName + " " + data.bolo.lastName, 300)
            .moveDown();

        // Display race only if there is a value in it
        if(data.bolo['race'] !== ""){
            doc.font('Times-Roman')
                .text("Race: " + data.bolo['race'], 300)
                .moveDown();
        }

        // Display Date Of Birth only if there is a value in it
        if(data.bolo['dob'] !== ""){
            doc.font('Times-Roman')
                .text("DOB: " + data.bolo['dob'], 300)
                .moveDown();
        }

        // Display Driver Licence Number only if there is a value in it
        if(data.bolo['dlNumber'] !== ""){
            doc.font('Times-Roman')
                .text("License#: " + data.bolo['dlNumber'], 300)
                .moveDown();
        }

        // Display Address only if there is a value in it
        if(data.bolo['address'] !== ""){
            doc.font('Times-Roman')
                .text("Address: " + data.bolo['address'], 300)
                .moveDown();
        }

        // Display Zip Code only if there is a value in it
        if(data.bolo['zipCode'] !== ""){
            doc.font('Times-Roman')
                .text("Zip Code: " + data.bolo['zipCode'], 300)
                .moveDown();
        }

        // Display Height only if there is a value in it
        if(data.bolo['height'] !== ""){
            doc.font('Times-Roman')
                .text("Height: " + data.bolo['height'], 300)
                .moveDown();
        }

        // Display Weight only if there is a value in it
        if(data.bolo['weight'] !== ""){
            doc.font('Times-Roman')
                .text("Weight: " + data.bolo['weight'] + " lbs", 300)
                .moveDown();
        }

        // Display Sex only if there is a value in it
        if(data.bolo['sex'] !== ""){
            doc.font('Times-Roman')
                .text("Sex: " + data.bolo['sex'], 300)
                .moveDown();
        }

        // Display Hair Color only if there is a value in it
        if(data.bolo['hairColor'] !== ""){
            doc.font('Times-Roman')
                .text("Hair Color: " + data.bolo['hairColor'], 300)
                .moveDown();
        }

        // Display Tattoos/Scars only if there is a value in it
        if(data.bolo['tattoos'] !== ""){
            doc.font('Times-Roman')
                .text("Tattoos/Scars: " + data.bolo['tattoos'], 300)
                .moveDown();
        }
    }//end of specific data

    doc.font('Times-Bold')
        .text("Created: " + data.bolo.createdOn, 15, 360)
        .moveDown(4.15);

    // Display Additional Informatin only if there is a value in it
    if(data.bolo['additional'] !== ""){
        doc.font('Times-Bold')
            .text("Additional: ", 15)
            .moveDown(0.25);
        doc.font('Times-Roman')
            .text(data.bolo['additional'], {width: 300})
            .moveDown();
    }

    // Display a Summery only if there is a value in it
    if(data.bolo['summary'] !== ""){
        doc.font('Times-Bold')
            .text("Summary: ", 15)
            .moveDown(0.25);
        doc.font('Times-Roman')
            .text(data.bolo['summary'], {width: 300})
            .moveDown(4);
    }
    doc.font('Times-Bold')
        .text("This BOLO was created by: " + data.user.sectunit + " " + data.user.ranktitle + " " + data.bolo.authorFName + " " + data.bolo.authorLName, 15)
        .moveDown(0.25);
    doc.font('Times-Bold')
        .text("Please contact the agency should clarification be required.");

    return doc;
}


/**
 * This is used to handle the data for the pdfPreview in Create Bolo View
 **/
PDFService.prototype.genPreviewPDF = function(doc, data) {

    doc.fontSize(8);
    doc.fillColor('red');
    doc.text("UNCLASSIFIED// FOR OFFICIAL USE ONLY// LAW ENFORCEMENT SENSITIVE", 120, 15)
        .moveDown(0.25);
    doc.fillColor('black');
    doc.text(data.agency_name + " Police Department")
        .moveDown(0.25);
    doc.text(data.agency_address)
        .moveDown(0.25);
    doc.text(data.agency_city + ", " + data.agency_state + ", " + data.agency_zip)
        .moveDown(0.25);
    doc.text(data.agency_phone)
        .moveDown(0.25);
    doc.fontSize(20);
    doc.fillColor('red');
    doc.text(data.bolo.category, 0, 115, {align: 'center'})
        .moveDown();
    doc.fontSize(11);

    // Display Status only if there is a value in it other then "New"
    if(data.bolo.status !== "New"){
        doc.fillColor('red');
        doc.text(data.bolo.status, 100, 140, {align: 'left'})
            .moveDown();
    }
    doc.fillColor('black');
    doc.fontSize(11);
    if (data.bolo.id === null) {
        doc.font('Times-Roman')
            .text("Bolo ID: " + "NO ID AVAILABLE", 300)
            .moveDown();
    } else {
        doc.font('Times-Roman')
            .text("Bolo ID: " + data.bolo.id, 300)
            .moveDown();
    }

    if(data.bolo.category === "THEFT - AUTO"){  //PDF for theft - auto

        // Display Year only if there is a value in it
        if(data.bolo['vehicleYear'] !== ""){
            doc.font('Times-Roman')
                .text("Year: " + data.bolo['vehicleYear'], 300)
                .moveDown();
        }

        // Display Make only if there is a value in it
        if(data.bolo.vehicleMake !== ""){
            doc.font('Times-Roman')
                .text("Make: " + data.bolo.vehicleMake, 300)
                .moveDown();
        }

        // Display Model only if there is a value in it
        if(data.bolo.vehicleModel !== ""){
            doc.font('Times-Roman')
                .text("Model: " + data.bolo.vehicleModel, 300)
                .moveDown();
        }


        // Display Trim only if there is a value in it
        if(data.bolo['vehicleTrim'] !== ""){
            doc.font('Times-Roman')
                .text("Type: " + data.bolo['vehicleTrim'], 300)
                .moveDown();
        }

        // Display Color only if there is a value in it
        if(data.bolo['vehicleColor'] !== ""){
            doc.font('Times-Roman')
                .text("Color: " + data.bolo['vehicleColor'], 300)
                .moveDown();
        }

        // Display License Plate only if there is a value in it
        if(data.bolo['vehicleLicensePlate'] !== ""){
            doc.font('Times-Roman')
                .text("License Plate: " + data.bolo['vehicleLicensePlate'], 300)
                .moveDown();
        }

        // Display VIN only if there is a value in it
        if(data.bolo['vehicleIdNumber'] !== ""){
            doc.font('Times-Roman')
                .text("Identification Number (VIN): " + data.bolo['vehicleIdNumber'], 300)
                .moveDown();
        }
    }
    else if(data.bolo.category === "THEFT - BOAT"){  //PDF for theft - boat

    //VESSEL
        //Display tittle VESSEL
        doc.fillColor('red');
        doc.fontSize(11);
        doc.font('Times-Roman')
            .text("VESSEL", 300)
            .moveDown();
        doc.fillColor('black');

        // Display Year only if there is a value in it
        if(data.bolo['boatYear'] !== ""){
            doc.font('Times-Roman')
                .text("Year: " + data.bolo['boatYear'], 300)
                .moveDown();
        }

        // Display Make only if there is a value in it
        if(data.bolo.boatManufacturer !== ""){
            doc.font('Times-Roman')
                .text("Manufacturer: " + data.bolo.boatManufacturer, 300)
                .moveDown();
        }

        // Display Model only if there is a value in it
        if(data.bolo.boatType !== ""){
            doc.font('Times-Roman')
                .text( "Type:" + data.bolo.boatType, 300)
                .moveDown();
        }

        // Display Length only if there is a value in it
        if(data.bolo['boatLength'] !== ""){
            doc.font('Times-Roman')
                .text("Length: " + data.bolo['boatLength'], 300)
                .moveDown();
        }

        // Display Color only if there is a value in it
        if(data.bolo['boatColor'] !== ""){
            doc.font('Times-Roman')
                .text("Color: " + data.bolo['boatColor'], 300)
                .moveDown();
        }

        // Display HIN only if there is a value in it
        if(data.bolo['boatHullIdNumber'] !== ""){
            doc.font('Times-Roman')
                .text("Hull Identification Number (HIN): " + data.bolo['boatHullIdNumber'], 300)
                .moveDown();
        }

        // Display Registration Number only if there is a value in it
        if(data.bolo['boatRegistrationNumberSt'] !== "" || data.bolo['boatRegistrationNumberNu'] !== ""){
            doc.font('Times-Roman')
                .text("Registration Number: " + data.bolo['boatRegistrationNumberSt'] + data.bolo['boatRegistrationNumberNu'], 300)
                .moveDown();
        }

        //Display tittle PROPULSION
        doc.fillColor('red');
        doc.fontSize(11);
        doc.font('Times-Roman')
            .text("PROPULSION", 300)
            .moveDown();
        doc.fillColor('black');

        // Display Propulsion only if there is a value in it
        if(data.bolo['propulsion'] !== ""){
            doc.font('Times-Roman')
                .text("Propulsion: " + data.bolo['propulsion'], 300)
                .moveDown();
        }

        // Display Type only if there is a value in it
        if(data.bolo['propulsionType'] !== ""){
            doc.font('Times-Roman')
                .text("Type: " + data.bolo['propulsionType'], 300)
                .moveDown();
        }

        // Display Make only if there is a value in it
        if(data.bolo['propulsionMake'] !== ""){
            doc.font('Times-Roman')
                .text("Make: " + data.bolo['propulsionMake'], 300)
                .moveDown();
        }

        // Display Propulsion Model only if there is a value in it
        if(data.bolo['propulsionModel'] !== ""){
            doc.font('Times-Roman')
                .text("Model: " + data.bolo['propulsionModel'], 300)
                .moveDown();
        }

        // Display Propulsion Serial Number only if there is a value in it
        if(data.bolo['propulsionSerialNumber'] !== ""){
            doc.font('Times-Roman')
                .text("Serial Number: " + data.bolo['propulsionSerialNumber'], 300)
                .moveDown();
        }

        //Display tittle TRAILER
        doc.fillColor('red');
        doc.fontSize(11);
        doc.font('Times-Roman')
            .text("TRAILER", 300)
            .moveDown();
        doc.fillColor('black');

        // Display Trailer only if there is a value in it
        if(data.bolo['trailer'] !== ""){
            doc.font('Times-Roman')
                .text("Trailer: " + data.bolo['trailer'], 300)
                .moveDown();
        }

        // Display Manufacturer only if there is a value in it
        if(data.bolo['trailerManufacturer'] !== ""){
            doc.font('Times-Roman')
                .text("Manufacturer: " + data.bolo['trailerManufacturer'], 300)
                .moveDown();
        }

        // Display Vehicle ID Number only if there is a value in it
        if(data.bolo['trailerVIN'] !== ""){
            doc.font('Times-Roman')
                .text("Vehicle ID Number: " + data.bolo['trailerVIN'], 300)
                .moveDown();
        }

        // Display Tag License Plate only if there is a value in it
        if(data.bolo['trailerTagLicenseState'] !== "" || data.bolo['trailerTagLicenseNumber'] !== ""){
            doc.font('Times-Roman')
                .text("Tag License Plate: " + data.bolo['trailerTagLicenseState'] + data.bolo['trailerTagLicenseNumber'], 300)
                .moveDown();
        }
    }
    else {  //PDF for general bolo

        doc.font('Times-Roman')
            .text("Name: " + data.bolo.firstName + " " + data.bolo.lastName, 300)
            .moveDown();

        // Display Race only if there is a value in it
        if(data.bolo['race'] !== ""){
            doc.font('Times-Roman')
                .text("Race: " + data.bolo['race'], 300)
                .moveDown();
        }

        // Display Make only if there is a value in it
        if(data.bolo['dob'] !== ""){
            doc.font('Times-Roman')
                .text("DOB: " + data.bolo['dob'], 300)
                .moveDown();
        }

        // Display Driver's Licence Number only if there is a value in it
        if(data.bolo['dlNumber'] !== ""){
            doc.font('Times-Roman')
                .text("License#: " + data.bolo['dlNumber'], 300)
                .moveDown();
        }

        // Display Address only if there is a value in it
        if(data.bolo['address'] !== ""){
            doc.font('Times-Roman')
                .text("Address: " + data.bolo['address'], 300)
                .moveDown();
        }

        // Display Zip Code only if there is a value in it
        if(data.bolo['zipCode'] !== ""){
            doc.font('Times-Roman')
                .text("Zip Code: " + data.bolo['zipCode'], 300)
                .moveDown();
        }

        // Display Height only if there is a value in it
        if(data.bolo['height'] !== ""){
            doc.font('Times-Roman')
                .text("Height: " + data.bolo['height'], 300)
                .moveDown();
        }

        // Display Weight only if there is a value in it
        if(data.bolo['weight'] !== ""){
            doc.font('Times-Roman')
                .text("Weight: " + data.bolo['weight'] + " lbs", 300)
                .moveDown();
        }

        // Display Sex only if there is a value in it
        if(data.bolo['sex'] !== ""){
            doc.font('Times-Roman')
                .text("Sex: " + data.bolo['sex'], 300)
                .moveDown();
        }

        // Display Hair Color only if there is a value in it
        if(data.bolo['hairColor'] !== ""){
            doc.font('Times-Roman')
                .text("Hair Color: " + data.bolo['hairColor'], 300)
                .moveDown();
        }

        // Display Tattoos/Scars only if there is a value in it
        if(data.bolo['tattoos'] !== ""){
            doc.font('Times-Roman')
                .text("Tattoos/Scars: " + data.bolo['tattoos'], 300)
                .moveDown();
        }
    }//end ofspecific data

    doc.font('Times-Bold')
        .text("Created: " + data.bolo.createdOn, 15, 360)
        .moveDown(4.15);

    // Display Additional Information only if there is a value in it
    if(data.bolo['additional'] !== ""){
        doc.font('Times-Bold')
            .text("Additional: ", 15)
            .moveDown(0.25);
        doc.font('Times-Roman')
            .text(data.bolo['additional'], {width: 300})
            .moveDown();
    }

    // Display Summery only if there is a value in it
    if(data.bolo['summary'] !== ""){
        doc.font('Times-Bold')
            .text("Summary: ", 15)
            .moveDown(0.25);
        doc.font('Times-Roman')
            .text(data.bolo['summary'], {width: 300})
            .moveDown(4);
    }
    doc.font('Times-Bold')
        .text("This BOLO was created by: " + data.sectunit + " " + data.ranktitle + " " + data.authName, 15)
        .moveDown(0.25);
    doc.font('Times-Bold')
        .text("Please contact the agency should clarification be required.");

    return doc;
}


module.exports = PDFService;
