'use strict';


const accounts = require ('./accounts.js');

const Donations = {
    home: {
        handler: function(request, h) {
            return h.view('home', { title: 'Make a Donation' });
        }
    },
    report: {
        handler: function(request, h) {
            return h.view('report', {
                title: 'Donations to Date',
                donations: this.donations,
            });
        }
    },
    donate: {
        handler: function(request, h) {
            const data = request.payload;
            this.donations.push(data);
            this.donations[this.donations.length-1].donor=this.currentUser;
            return h.redirect('/report');
        }
    }
};

module.exports = Donations;