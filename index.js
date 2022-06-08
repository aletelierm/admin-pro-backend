require('dotenv').config();

const express = require('express');
const cors = requiire('cors');

const { dbConnection } = require('../backend-server/database/config')

//Crear el servidor de express
const app = express();

//Configurar CORS
app.use( cors() );

//Base de datos
dbConnection();


//Rutas
app.get( '/', (req, res) =>{
    res.json({
        ok: true,
        msg: 'hola mundo'
    })
} );

//l0QBow9NYPlZ46Ng


//Levantar servidor
app.listen( process.env.PORT, () =>{
    console.log('servidor corriendo en puerto '+ process.env.PORT );
} );
