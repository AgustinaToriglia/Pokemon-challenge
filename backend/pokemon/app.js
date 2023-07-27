import express from 'express';
import mongoose from 'mongoose';
import pokemonRoutes from './routes/pokemonRoutes.mjs';
import cors from 'cors';
import winston from 'winston';

const app = express();
const port = 3001;

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(
      (info) => `[${info.timestamp}] == ${info.level.toUpperCase()} - ${info.message}`
    )
  ),
  transports: [
    new winston.transports.Console(),
  ],
});

app.use(cors());

app.use(express.json());

app.use((req, res, next) => {
  next()
  logger.info(`${req.method} - ${req.url} - ${res.statusCode}`)
})

// Conexión a la base de datos de MongoDB
const dbURI = 'mongodb://127.0.0.1:27017/pokemons';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conexión a MongoDB exitosa');
    app.listen(port, () => {
      console.log(`El servidor está corriendo en http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('Error al conectar a MongoDB:', err);
  });

app.use('/', pokemonRoutes);

app.get('/', (req, res) => {
  res.send('¡Hola, este es un servidor Express con conexión a MongoDB y CRUD de Pokemon!');
});
