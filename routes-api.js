const Candidates = require('./app/api/candidates');

module.exports = [
    { method: 'GET', path: '/api/candidates', config: Candidates.find }
];