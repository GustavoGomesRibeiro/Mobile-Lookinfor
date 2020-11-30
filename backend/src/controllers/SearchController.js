const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    async index (request, response) {
        const { latitude, longitude, techs, username} = request.query;

        const tecnologiaArray = parseStringAsArray(techs);
        
        const devs = await Dev.find({
            techs: {
                $in: tecnologiaArray,
            },
            // username:{
            //     $in: username,
            // },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [ longitude, latitude ],
                        $maxDistance: 10000,
                    },
                },
            },
        });
        return response.json({devs});
    }
}