// requerimiento de modulos
const express = require('express'),
    path = require('path'),
    methodOverride = require('method-override'),
    cookieParser = require('cookie-parser');

// app
const app = express(),
    PORT = 3000;

// configuracion directorio public
app.set('views', path.resolve(__dirname, './views'));


//middlewares
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


// enrutamientos
let authRoute = require('./routes/auth');
let charactersRoute = require('./routes/characters');
let moviesRoute = require('./routes/movies');

app.use('/auth', authRoute);
app.use('/characters', charactersRoute);
app.use('/movies', moviesRoute);


app.listen(PORT, () => console.log(`servidor levantado
http://localhost:${PORT}`))


// api key SENDGRID
// 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