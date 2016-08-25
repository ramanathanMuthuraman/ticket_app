'use strict';
var chai = require('chai');
require('jquery');
var expect = chai.expect;


var ticketHereApp = require('../../src/app/ticketHereApp.js');

describe("Test for application bootstrap", function() {
    $("<div/>", { "id": "main" }).appendTo('body');
    it("Application should be rendered", function() {
        ticketHereApp.init();
        var header = document.getElementById('header');
        expect(header).to.not.equal(null);
    });
});
