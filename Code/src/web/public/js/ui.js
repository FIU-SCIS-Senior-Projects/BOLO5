var bolo = window.bolo || {};

bolo.cache = {};
bolo.eventHandlers = {

};

bolo.cacheElements = function () {
    var ele = {};
    createBoloForm = document.querySelector('#create-bolo-form');
    bolo.cache.addImageGroup = document.querySelector('#form-add-img-group');
    bolo.cache.addImageButton = document.querySelector('#form-add-img-btn');
};


bolo.init = function () {
    bolo.cacheElements();
};

window.addEventListener("load", function (event) {
    bolo.init();
});

//Valdations for forms
jQuery(function(){

    //Validations for Theft-Auto
    //Validate numbers, lenght 4
    $("#vehicleYear").mask("9999",{placeholder:""});
    //Transform characters to uppercase
    $("#vehicleLicensePlate[type=text]").keyup(function(){
        $(this).val( $(this).val().toUpperCase() );
    });
    //Transform characters to uppercase
    $("#vehicleIdNumber[type=text]").keyup(function(){
        $(this).val( $(this).val().toUpperCase() );
    });

});
