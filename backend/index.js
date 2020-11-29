//importamos/requerimos express y controladores
const express = require('express');
const usersRouter = require('./routes/user-controller');
const tokensvRouter = require('./routes/tokenv-controller');
const indexRouter = require('./routes/index-controller');
const postRouter = require('./routes/post-controller');
const commentRouter = require('./routes/comment-controller');
const categoryRouter = require('./routes/category-controller');

//instanciamos nueva aplicación express
const app = express();

//necesario para poder recibir datos en json
app.use(express.json());

//las ruta "/" se gestiona en indexRouter
app.use('/', indexRouter);

//las rutas que empiecen por /api/users se dirigirán a usersRouter
app.use('/api/users', usersRouter);

//las rutas que empiecen por /api/posts se dirigirán a postRouter
app.use('/api/posts', postRouter);

//las rutas que empiecen por /api/comments se dirigirán a commentsRouter
app.use('/api/comments', commentRouter);

//las rutas que empiecen por /api/categories se dirigirán a categoryRouter
app.use('/api/categories', categoryRouter);

app.use('/api/tokensv', tokensvRouter);

//arranque del servidor
const port = 3005
app.listen(port, () => console.log(`App listening on port ${port}!`))