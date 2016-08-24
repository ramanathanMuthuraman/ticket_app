'use strict';
var template = require('./template.html');
require('../assets/css/reset.less');
require('../assets/css/style.less');

var ticketHere = {
    init: function() {
        $("#main").html(template);
    }
};

ticketHere.init();
