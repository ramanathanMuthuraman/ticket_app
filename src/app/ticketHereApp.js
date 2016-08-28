'use strict';
var layoutTemplate = require('./layoutTemplate.html');
var resultTemplate = require('./resultTemplate.html');
var autoComplete = require('autoComplete');
var _ = require('lodash');
var Flatpickr = require('flatpickr');
var jRange = require('jRange');
var ticketHereApp = {
    init: function() {
        this.loadData();
        $("#main").html(layoutTemplate);
        this.loadAutoComplete();
        this.createDateTimePicker();
        this.createPriceSlider();
        this.setDimension();
        this.resultData = [];
        this.bindEvents();
    },
    bindEvents: function() {
        $('.tab-header').on('click', this.tabChange.bind(this));
    },
    tabChange: function(event) {
        var previouslySelectedId = $('.tab-container .tab-active-radio:checked').attr('id');
        var currentlySelectedId = $(event.currentTarget).attr('for');
        if (previouslySelectedId !== currentlySelectedId) {
            $('.return-date-area').toggleClass('hide');
        }
    },
    setDimension: function() {
        $('.search-area, .result-area').outerHeight(window.innerHeight - $('#header').height());
    },
    loadData: function() {

        $.when($.ajax("flight_data.json"))
            .then(this.successCallback.bind(this), this.errorCallback.bind(this));

    },
    renderResults: function(data) {
        console.log(data);
        var compiled = _.template(resultTemplate);
        $('.matching-list').html(compiled({ 'list': data }));
    },
    successCallback: function(data) {
        this.renderResults(data);

    },
    errorCallback: function(error) {
        console.log("Network Error, Please try after sometime.");
    },
    loadAutoComplete: function() {
        $('.origin-autoComplete').autoComplete({
            minChars: 1,
            source: function(term, suggest) {
                suggest(["aa", "bb"]);
            }
        });
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
        var width = $('.price-filter-area').width() - ($('.price-filter-area').width() * 0.04);
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
