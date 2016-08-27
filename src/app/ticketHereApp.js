'use strict';
var template = require('./template.html');
var Flatpickr = require('flatpickr');
var jRange = require('jRange');
var ticketHereApp = {
    init: function() {
        $("#main").html(template);
        this.createDateTimePicker();
        this.createPriceSlider();
    },
    createDateTimePicker: function() {
        var options = {
            enableTime: true,
            time_24hr: true
        };
        new Flatpickr($('.form-departureDateTime').get(0), options);
        new Flatpickr($('.form-returnDateTime').get(0), options);
    },
    createPriceSlider: function() {
        var width = $('.price-filter-area').width();
        $('.slider-input').jRange({
            from: 0,
            to: 100,
            step: 1,
            scale: [0, 25, 50, 75, 100],
            format: '%s',
            width: width,
            showLabels: true,
            isRange: true
        });
    }

};
module.exports = ticketHereApp;
