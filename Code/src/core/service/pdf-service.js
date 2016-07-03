'use strict';
var _ = require('lodash');
var Promise = require('promise');

function PDFService() {

}

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
