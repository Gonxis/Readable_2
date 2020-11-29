const express = require('express');
const router = express.Router();
//requerimos bcrypt para encriptar posteriormente la contraseña del usuario
const bcrypt = require('bcrypt');
//requerimos el index.js de models que inicializa sequelize
const model = require('../models/index');

// permitimos acceso desde otro servidor
router.all('/', (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, OPTIONS, DELETE");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    next();
});
const Post = model.Post;
const Token = model.Token;

// permitimos acceso desde otro servidor
router.all('/:algo', (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, OPTIONS, DELETE");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    next();
});

router.all('/:algo',(req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, OPTIONS, DELETE");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    next();
});

/* GET /  */
router.get('/', function(req, res, next) {
    res.send(`
        <h1>Llamo a Post "GET /"</h1>
    `);
});

module.exports = router;