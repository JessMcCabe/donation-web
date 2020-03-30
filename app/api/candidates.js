'use strict';



const Candidates = {
    find: {
        auth: false,
        handler: async function(request, h) {
            const candidates = await Candidates.find();
            return candidates;
        }
    },
};

module.exports = Candidates;