'use strict';

const Accounts = {
    index: {
        auth: false,
        handler: function(request, h) {
            return h.view('main', { title: 'Welcome to Donations' });
        }
    },
    showSignup: {
        auth: false,
        handler: function(request, h) {
            return h.view('signup',
                { title: 'Sign up for Donations' });
        }
    },
    signup: {
        auth: false,
        handler: function(request, h) {
            const user = request.payload;
            this.users[user.email] = user;
            this.currentUser = user;
            return h.redirect('/home');
        }
    },
    showLogin: {
        auth: false,
        handler: function(request, h) {
            return h.view('login', { title: 'Login to Donations' });
        }
    },
    login: {
        auth: false,
        handler: function(request, h) {
            const user = request.payload;
            if ((user.email in this.users) && (user.password === this.users[user.email].password)) {
                this.currentUser = this.users[user.email];
                return h.redirect('/home');
            }
            return h.redirect('/');
        }
    },
    logout: {
        auth: false,
        handler: function(request, h) {
            return h.redirect('/');
        }
    }
};

module.exports = Accounts;