'use strict';

var app = {
    windowWidth: 0,
};

$(window).on('load resize', function () {
    app.windowWidth = $(window).width();
});

$(document).on('scroll load', function () {
    if (app.windowWidth > 499) {
        if ($(window).scrollTop() > 20) {
            $('header').addClass('scrolled');
        } else {
            $('header').removeClass('scrolled');
        }
    }
});

// lightbox initiation
/*$('figure').on('click.magnific', 'img', function (e) {
    e.preventDefault();

    var imgParts = $(this).attr('src').split('-');
    var imgExt = imgParts[imgParts.length - 1][1];
    imgParts[imgParts - 1] = '-xlarge.' + imgExt;

    $.magnificPopup.open({
        items: {
            src: imgParts.join('-')
        },
        type: 'image'
    });
});*/