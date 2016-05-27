(function ($, window, document, undefined) {

    var ew = $('.js-navList').vMenu();

    $('.js-init').on('click', function() {
    	$('.js-navList').vMenu();
    });

    $('.js-update').on('click', function() {
    	$('.js-navList').vMenu('update');
    });

    $('.js-destroy').on('click', function() {
    	$('.js-navList').vMenu('destroy');
    });

})(jQuery, window, document);