// get, post, put, delete methods http

//tipos de paramentros:
    //Query Params: request.query(filtro, paginacao, ordenacao)
    //Route Params: usado no metodo put e delete request.params (Identificar um recurso na alteacao ou remocao)
    //Body: Post e Put request.body (dados para criacao ou alteracao do registro)
// requisicao e resposta
// MongoDB

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');

//conection with data base.
const app = express();
mongoose.connect('mongodb+srv://Gustavo:cacete1711@cluster0-rclel.mongodb.net/lookingfor?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333);