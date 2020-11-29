const express = require('express');
const router = express.Router();

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

// permitimos acceso desde otro servidor
router.all('/:algo', (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, OPTIONS, DELETE");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    next();
});

// importante: todas las rutas get, post... son relativas a la ruta principal
// de este controlador: /api/alquileres
// GET lista de todos los alquileres
// vinculamos la ruta /api/alquileres a la función declarada
// si todo ok devolveremos un objeto tipo:
// {ok: true, data: [lista_de_objetos_alquiler...]}
// si se produce un error:
// {ok: false, error: mensaje_de_error}
router.get('/', function(req, res, next) {
    //findAll es un método de sequelize!
    model.Tokenv.findAll()
        .then(tokensv => res.json({
            ok: true,
            data: tokensv
        }))
        .catch(error => res.json({
            ok: false,
            error: error
        }))
});

// GET de tipo /api/alquileres/7
// petición de UN alquiler, con ID=7
// "7" se recibe por parámetro y se lee con req.params.id
// en este caso utilizamos el método sequelize findOne
// con la condición "where id=7"
// expresada en forma de objeto: { where: {id:req.params.id}}
router.get('/:id', function(req, res, next) {
    model.Tokenv.findOne({ where: { id: req.params.id } })
        // .then(alquiler => alquiler.get({plain: true}))
        .then(tokenv => res.json({
            ok: true,
            data: tokenv
        }))
        .catch(error => res.json({
            ok: false,
            error: error
        }))
});

// POST a /api/tokenv creamos un nuevo registro
// en primer lugar creamos un modelo Tokenv con el método sequelize "create"
// a partir de los datos presentes en el "body"
// a continuación, mediante "save", el objeto se guarda automáticamente
// en la base de datos y e actualiza su ID!
// igualmente se devuelve el objeto creado
router.post('/', function(req, res, next) {
    console.log("body:", req.body);
    let user = {
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        genre: req.body.genre,
        isAdmin: req.body.isAdmin,
        created: new Date(),
        password: req.body.password
    };
    console.log("user:", user);

    let token = {
        token: req.body.token,
        user_id: req.body.user_id,
        created: new Date()
    };
    console.log("token:", token);

    model.User.create(user)
        .then((item) => item.save())
        .then((item) => res.json({ ok: true, data: item }))
        .catch((error) => res.json({ ok: false, error }));

    model.Token.create(token)
        .then((item) => item.save())
        .then((item) => res.json({ ok: true, data: item }))
        .catch((error) => res.json({ ok: false, error }))
});

// PUT a /api/alquileres/X
// en primer lugar se localiza el alquiler con id=X en la BDD
// a continuación, mediante "update", el objeto se actualiza con los datos
// presentes en el "body"
router.put('/:id', function(req, res, next) {
    model.Tokenv.findOne({ where: { id: req.params.id } })
        .then((tokenv) =>
            tokenv.update(req.body)
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

// DELETE a /api/alquileres/X
// se elimina el registro con id = X con elmétodo sequelize "destroy"
router.delete('/:id', function(req, res, next) {
    model.Tokenv.destroy({ where: { id: req.params.id } })
        .then((data) => res.json({ ok: true, data }))
        .catch((error) => res.json({ ok: false, error }))
});
module.exports = router;