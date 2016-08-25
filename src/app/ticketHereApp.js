'use strict';
var template = require('./template.html');
var ticketHereApp = {
    init: function() {
        $("#main").html(template);
    }
};
module.exports = ticketHereApp;
