const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
// const authConfig = require('../config/auth');
// const jwt = require('jsonwebtoken');


module.exports = {
    async index(request, response) {
        const devs = await Dev.find();
        return response.json(devs);
    },

    async store(request, response) {
        const { github_username, techs, latitude, longitude, username, password } = request.body

        let dev = await Dev.findOne({ github_username });

        try {
            if (!dev) {
                const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`)
                // name = login para pegar o valor padrao do name
                // const token = jwt.sign({ id: dev.id }, authConfig.secret, {
                //     expiresIn: 86400,
                // })
                const { name = login, avatar_url, bio } = apiResponse.data;
                const tecnologiaArray = parseStringAsArray(techs);
                const location = {
                    type: 'Point',
                    coordinates: [longitude, latitude],
                };
                dev = await Dev.create({
                    github_username,
                    name,
                    bio,
                    avatar_url,
                    techs: tecnologiaArray,
                    location,
                    username,
                    password,
                });
                response.send({ dev });
                return response.status(400).send({ error: 'User already exists' });
            }
        } catch (err) {
            return response.status(400).send({ error: 'Registration failed' });
        }
        return response.json(dev);
    }

}

//     async store(request, response) {
//         const {github_username, techs, latitude, longitude, username, password} = request.body

//         let dev = await Dev.findOne({github_username});
//         try {
//             if(!dev){
//                 const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`)
//                 // name = login para pegar o valor padrao do name
//                 const token = jwt.sign({ id: loginUser.id }, authConfig.secret, {
//                     expiresIn: 86400,
//                 })
//                 const { name = login, avatar_url, bio} = apiResponse.data;
//                 const tecnologiaArray = parseStringAsArray(techs);
//                 const location = {
//                     type: 'Point',
//                     coordinates: [longitude, latitude],
//                 };
//                 dev = await Dev.create({
//                     github_username,
//                     name,
//                     bio,
//                     avatar_url,
//                     techs: tecnologiaArray,
//                     location,
//                     username,
//                     password,
//                 });
//                 response.send({ dev, token });
//                 return response.status(400).send({error: 'User already exists'});
//             }
//     } catch (err) {
//         return response.status(400).send({error: 'Registration failed'});
//     }
//         return response.json(dev);
//     }
// }