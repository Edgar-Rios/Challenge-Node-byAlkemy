// requerimiento de modulos
const express = require('express'),
    path = require('path');


// app
const app = express(),
    PORT = 3000;

// configuracion directorio public
// app.use(express.static(path.resolve(__dirname, '../public')));

//URL encode  - Para que nos pueda llegar la información desde el formulario al req.body
app.use(express.urlencoded({ extended: false }));


// enrutamientos
let authRoute = require('./routes/auth');
let charactersRoute = require('./routes/characters');
let moviesRoute = require('./routes/movies');

app.use('/auth', authRoute);
app.use('/characters', charactersRoute);
app.use('/movies', moviesRoute);


app.listen(PORT, () => console.log(`servidor levantado
http://localhost:${PORT}`))