'use strict';
var chai = require('chai');
require('jquery');
var expect = chai.expect;

var ticketHereApp = require('../../src/app/ticketHereApp.js');

describe("Test if application has rendered in browser", function() {
    $("<div/>", { "id": "main" }).appendTo('body');
    it("Header element of the application should be rendered", function() {
        ticketHereApp.init();
        var header = document.getElementById('header');
        expect(header).to.not.equal(null);
    });
});

describe("Test if tab works properly", function() {
    it("Return date should be visible on tab change", function() {
        ticketHereApp.tabChange();
        var returnDateContainer = $('.return-date-area').get(0);
        expect(returnDateContainer.className.indexOf('hide')).to.be.equal(-1);
    });
});


describe("Test for form validation", function() {
    it("Error message should be shown on empty form fields", function() {
        ticketHereApp.getUserInput();
        var message = $('.error-message').get(0);
        expect(message.className.indexOf('hide')).to.be.equal(-1);
    });
});

describe("Test for no records found", function() {
    it("Error message should be shown on empty form fields", function() {
        ticketHereApp.filterData([]);
        var message = $('.matching-list').text();
        expect(message).to.be.equal("No records found");
    });
});
