const express = require('express');
const cors = require('cors');

const app = express();

// Habilitar CORS para todas las solicitudes
app.use(cors());

app.listen(3000, () => {
    console.log('Servidor iniciado en el puerto 3000');
  });