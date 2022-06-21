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

//Directorio publico
app.use( express.static('public'));

//Rutas( definiendo las rutas)
app.use( '/api/usuarios', require('./routes/usuarios'));
app.use( '/api/hospitales', require('./routes/hospitales'));
app.use( '/api/medicos', require('./routes/medicos'));
app.use( '/api/todo', require('./routes/busquedas'))
app.use( '/api/upload', require('./routes/uploads'));
app.use( '/api/login', require('./routes/auth'));

//l0QBow9NYPlZ46Ng


//Levantar servidor
app.listen( process.env.PORT, () =>{
    console.log('servidor corriendo en puerto '+ process.env.PORT );
} );
