
//Validations for forms
jQuery(function(){

//Validations for General bolo

    // Uppercase first letter each word Last Name
    $("#lastName[type='text']").keyup(function(evt){
        var txt = $(this).val();
        $(this).val(txt.replace(/^(.)|\s(.)/g, function($1){ return $1.toUpperCase();}));
    });
    // Uppercase first letter each word First Name
    $("#firstName[type='text']").keyup(function(evt){
        var txt = $(this).val();
        $(this).val(txt.replace(/^(.)|\s(.)/g, function($1){ return $1.toUpperCase();}));
    });
    //Validate numbers in format 99/99/99 Date of Birth
    $("#dob").mask("99/99/9999",{placeholder:""});
    //Transform characters to uppercase
    $("#dlNumber[type=text]").keyup(function(){
        $(this).val( $(this).val().toUpperCase());
    });
    //Transform characters to uppercase Address
    $("#address[type=text]").keyup(function(){
        $(this).val( $(this).val().toUpperCase());
    });
    //Validate numbers in format 99999 Xip Code
    $("#zipCode").mask("99999",{placeholder:""});
    //Validate numbers in format 99-99 Height
    $("#height").mask("99-99",{placeholder:""});
    //Validate numbers in format 999 Weight
    $("#weight").mask("999",{placeholder:""});


//Validations for Theft-Auto

    //Validate numbers, lenght 4 Vehicle Year
    $("#vehicleYear").mask("9999",{placeholder:""});
    // Uppercase first letter each word Vehicle Model
    $("#vehicleModel[type='text']").keyup(function(evt){
        var txt = $(this).val();
        $(this).val(txt.replace(/^(.)|\s(.)/g, function($1){ return $1.toUpperCase();}));
    });
    // Uppercase first letter each word Vehicle Trim
    $("#vehicleTrim[type='text']").keyup(function(evt){
        var txt = $(this).val();
        $(this).val(txt.replace(/^(.)|\s(.)/g, function($1){ return $1.toUpperCase();}));
    });
    // Uppercase first letter each word Vehicle Color
    $("#vehicleColor[type='text']").keyup(function(evt){
        var txt = $(this).val();
        $(this).val(txt.replace(/^(.)|\s(.)/g, function($1){ return $1.toUpperCase();}));
    });
    //Transform characters to uppercase Vehicle License Plate
    $("#vehicleLicensePlate[type=text]").keyup(function(){
        $(this).val( $(this).val().toUpperCase());
    });
    //Transform characters to uppercase Vehicle VIN
    $("#vehicleIdNumber[type=text]").keyup(function(){
        $(this).val( $(this).val().toUpperCase());
    });

//Validations for Theft-Boat VESSEL

    //Validate numbers, lenght 4 Boat Year
    $("#boatYear").mask("9999",{placeholder:""});
    // Uppercase first letter each word Boat Manufacturer
    $("#boatManufacturer[type='text']").keyup(function(evt){
        var txt = $(this).val();
        $(this).val(txt.replace(/^(.)|\s(.)/g, function($1){ return $1.toUpperCase();}));
    });
    // Uppercase first letter each word Boat Type
    $("#boatType[type='text']").keyup(function(evt){
        var txt = $(this).val();
        $(this).val(txt.replace(/^(.)|\s(.)/g, function($1){ return $1.toUpperCase();}));
    });
    // Uppercase first letter each word Boat Color
    $("#boatColor[type='text']").keyup(function(evt){
        var txt = $(this).val();
        $(this).val(txt.replace(/^(.)|\s(.)/g, function($1){ return $1.toUpperCase();}));
    });
    //Transform characters to uppercase Hull ID
    $("#boatHullIdNumber[type=text]").keyup(function(){
        $(this).val( $(this).val().toUpperCase());
    });
    //Transform characters to uppercase Vehicle VIN
    $("#boatRegistrationNumberNu[type=text]").keyup(function(){
        $(this).val( $(this).val().toUpperCase());
    }).mask("9999aa",{placeholder:""});

//Validations for Theft-Boat PROPULSION
    // Uppercase first letter each word Boat Model
    $("#boatModel[type='text']").keyup(function(evt){
        var txt = $(this).val();
        $(this).val(txt.replace(/^(.)|\s(.)/g, function($1){ return $1.toUpperCase();}));
    });
    //Transform characters to uppercase Propulsion Serial Number
    $("#propulsionSerialNumber[type=text]").keyup(function(){
        $(this).val( $(this).val().toUpperCase());
    });

//Validations for Theft-Boat TRAILER

    //Transform characters to uppercase Trailer VIN
    $("#trailerVIN[type=text]").keyup(function(){
        $(this).val( $(this).val().toUpperCase());
    });

    //Transform characters to uppercase Trailer Tag License Number
    $("#trailerTagLicenseNumber[type=text]").keyup(function(){
        $(this).val( $(this).val().toUpperCase());
    });

});
