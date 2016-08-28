'use strict';
var layoutTemplate = require('./layoutTemplate.html');
var resultTemplate = require('./resultTemplate.html');
var autoComplete = require('autoComplete');
var _ = require('lodash');
var Flatpickr = require('flatpickr');
var jRange = require('jRange');
var moment = require('moment');

var ticketHereApp = {
    init: function() {
        this.loadAutoCompleteData();
        $("#main").html(layoutTemplate);
        this.createAutoComplete();
        this.createDateTimePicker();
        this.createPriceSlider();
        this.setDimension();
        this.resultData = [];
        this.bindEvents();
    },
    callAjax: function(options) {
        $.when($.ajax(options.url))
            .then(options.successCallback.bind(this), this.errorCallback.bind(this));
    },
    loadAutoCompleteData: function() {
        var options = {
            url: 'flight_data.json',
            successCallback: this.createAutoComplete
        };
        this.callAjax(options);
    },
    bindEvents: function() {
        $('.tab-header').on('click', this.tabClick.bind(this));
        $('.submit-button').on('click', this.getUserInput.bind(this));

    },
    tabChange: function() {
        $('.return-date-area').toggleClass('hide');
    },
    filterData: function(data) {
        this.renderResults(data);
    },
    getActiveTab: function() {
        return $('.tab-container .tab-active-radio:checked').attr('id');
    },
    tabClick: function(event) {
        var previouslySelectedId = this.getActiveTab();
        var currentlySelectedId = $(event.currentTarget).attr('for');
        if (previouslySelectedId !== currentlySelectedId) {
            this.tabChange();
        }
    },
    setDimension: function() {
        $('.search-area, .result-area').outerHeight(window.innerHeight - $('#header').height());
    },
    isFormValid: function() {
        var activeTabId = this.getActiveTab();
        var isFormValid = true;
        var fieldsToValidate = [".origin-autoComplete", ".destination-autoComplete", ".form-departureDateTime"];
        if (activeTabId === "tab2") {
            fieldsToValidate.push(".form-returnDateTime");
        } else {
            if (fieldsToValidate.indexOf('.form-returnDateTime') >= 0) {
                fieldsToValidate.splice(".form-returnDateTime", 1);
            }

        }
        $(fieldsToValidate).each(function() {
            if ($(this).val().length === 0) {
                $(this).next().removeClass('hide');
                isFormValid = false;
            } else {
                $(this).next().addClass('hide');
            }
        });

        return isFormValid;

    },
    getUserInput: function() {
        if (this.isFormValid()) {
            var origin = $('.origin-autoComplete').val();
            var destination = $('.destination-autoComplete').val();
            var departureTime = $(".form-departureDateTime").val();
            this.loadData();
        }
    },
    loadData: function() {
        var options = {
            url: 'flight_data.json',
            successCallback: this.filterData
        };
        this.callAjax(options);
    },
    renderResults: function(data) {
        var compiled = _.template(resultTemplate, { 'imports': { 'moment': moment } });
        $('.matching-list').html(compiled({ 'list': data }));
    },
    errorCallback: function(error) {
        console.log("Network Error, Please try after sometime.");
    },
    createAutoComplete: function(data) {

        $('.origin-autoComplete').autoComplete({
            minChars: 0,
            source: function(term, suggest) {
                suggest(_.map(data, 'origin'));
            }
        });
        $('.destination-autoComplete').autoComplete({
            minChars: 0,
            source: function(term, suggest) {
                suggest(_.map(data, 'destination'));
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
