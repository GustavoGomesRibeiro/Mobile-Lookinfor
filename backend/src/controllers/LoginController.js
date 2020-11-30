const axios = require('axios');
const Dev = require('../models/Dev');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

module.exports = {


    async store(request, response) {
        const { username, password } = request.body;
        let loginUser = await Dev.findOne({username}).select('+password');

        if(!loginUser)
            return response.status(400).send({error: 'User not found'});
        // verificando se a senha digita e a mesma
        if(!await bcrypt.compare(password, loginUser.password))
        return response.status(400).send({error: 'Invalid password'});

        const token = jwt.sign({ id: loginUser.id }, authConfig.secret, {
            expiresIn: 86400,
        })
        response.send({ loginUser, token })
    }
    // async store( request, response) {
    //     const { username, password } = request.body;
        
    //     let loginUser = await Dev.find({username, password});

    //     if(!loginUser){
    //         const apiResponse = await axios.get(`http://localhost:3333/login`);
    //         const { username, password } = apiResponse.data;
            
    //         loginUser = await Dev.create({
    //             username,
    //             password,
    //         });
    //     }
    //     return response.json(loginUser);
    // }
}
