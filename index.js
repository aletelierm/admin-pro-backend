require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../backend-server/database/config')

//Crear el servidor de express
const app = express();

//Configurar CORS
app.use( cors() );

//Lectura y parse del Body
app.use( express.json() );



//Base de datos
dbConnection();


//Rutas
app.use( '/api/usuarios', require('./routes/usuarios'));
app.use( '/api/login', require('./routes/auth'));


//l0QBow9NYPlZ46Ng


//Levantar servidor
app.listen( process.env.PORT, () =>{
    console.log('servidor corriendo en puerto '+ process.env.PORT );
} );
