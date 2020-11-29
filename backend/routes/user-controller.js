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
const Usuari = model.User;
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

// importante: todas las rutas get, post... son relativas a la ruta principal
// de este controlador: /api/pokemons
// GET lista de todos los pokemons
// vinculamos la ruta /api/pokemons a la función declarada
// si todo ok devolveremos un objeto tipo:
// {ok: true, data: [lista_de_objetos_pokemon...]}
// si se produce un error:
// {ok: false, error: mensaje_de_error}
router.get('/', function (req, res, next) {
    //findAll es un método de sequelize!
    model.User.findAll()
        .then(users => res.json({
            ok: true,
            data: users
        }))
        .catch(error => res.json({
            ok: false,
            error: error
        }))
});

// GET de tipo /api/users/7
// petición de UN user, con ID=7
// "7" se recibe por parámetro y se lee con req.params.id
// en este caso utilizamos el método sequelize findOne
// con la condición "where id=7"
// expresada en forma de objeto: { where: {id:req.params.id}}
router.get('/:id', function (req, res, next) {
    model.User.findOne({ where: { id: req.params.id } })
        // .then(user => user.get({plain: true}))
        .then(user => res.json({
            ok: true,
            data: user
        }))
        .catch(error => res.json({
            ok: false,
            error: error
        }))
});

// POST a /api/users creamos un nuevo registro
// en primer lugar creamos un modelo User con el método sequelize "create"
// a partir de los datos presentes en el "body"
// a continuación, mediante "save", el objeto se guarda automáticamente
// en la base de datos y e actualiza su ID!
// igualmente se devuelve el objeto creado
router.post('/create', function(req, res, next) {
    //Realizamos encriptado del password
    const hash = bcrypt.hashSync(req.body.password, 10);
    req.body.password=hash;
    //Creamos el usuario con el password encriptado
    model.User.create(req.body)
        .then((item) => item.save())
        .then((item) => res.json({ ok: true, data: item }))
        .catch((error) => res.json({ ok: false, error }))
});

/* POST LOGIN */
router.post('/login',  (req, res) => {
    //leemos email y password del body
    const { email, password } = req.body;
    // si email / password no se han facilitado devolvemos error con código de estado 400
    if (!email || !password) {
        return res.status(400).json({ok:false, error:"email o password no recibidos"});
    }
    //buscamos usuario y comprobamos si password coincide
    //findOne es un método de sequelize, si no encuentra nada devolverá error
    Usuari.findOne({ where: { email } })
        .then((usuari) => {
            //comparamos el password recibido con el password del usuario guardado en bdd, ambos encriptados
            if (bcrypt.compareSync(password, usuari.password)) {
                //si ok, devolvemos usuario a siguiente "then" 
                return usuari;
            } else {
                // si no coinciden pasamos msg error a "catch"
                throw "password no coincide";
            }
        })
        .then((usuari)=>{
            //ok, login correcto, creamos un token aleatorio
            let token = '';
            const caractersPossibles = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            const longitud = 15;
            for (var i = 0; i < longitud; i++) {
                token += caractersPossibles.charAt(
                Math.floor(Math.random() * caractersPossibles.length)
                );
            }
            //devolvemos un nuevo objeto "token" al siguiente then, que incluye id y email de usuario
            console.log(token);
            return Token.create({ token, user_id: usuari.id })
        })
        .then((token)=>res.json({ok:true, data:token,})) //enviamos respuesta con el token completo en json
        .catch((error)=>res.json({ok:false, error:error}));
    });

// PUT a /api/users/X
// en primer lugar se localiza el user con id=X en la BDD
// a continuación, mediante "update", el objeto se actualiza con los datos
// presentes en el "body"
router.put('/:id', function (req, res, next) {
    model.User.findOne({ where: { id: req.params.id } })
        .then((user) =>
            user.update(req.body)
        )
        .then((ret) => res.json({
            ok: true,
            data: ret
        }))
        .catch(error => res.json({
            ok: false,
            error: error
        }));
});

//LogOut Session Usuario y eliminacion del token

router.delete('/logout',  (req, res) => {
    const {token } = req.body;
    //si no existe el token no aceptamos logout
    if (!token) {
        return res.status(400).json({ok:false, error:"token no recibido"});
    }
    // si lo recibimos, intentamos eliminarlo
    Token.destroy({ where: { token } })
    .then(()=>res.json({ok:true}))
    .catch((error)=>res.json({ok:false, error:error}));
});

// DELETE a /api/users/X
// se elimina el registro con id = X con elmétodo sequelize "destroy"
router.delete('/:id', function (req, res, next) {
    model.User.destroy({ where: { id: req.params.id } })
        .then((data) => res.json({ ok: true, data }))
        .catch((error) => res.json({ ok: false, error }))
});

module.exports = router;