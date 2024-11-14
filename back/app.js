import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import bookRoutes from './bookRoutes.js'; 
import cors from 'cors';
import { fileURLToPath } from 'url';

const app = express();
app.use(cors());
app.use(express.json());

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

app.use(express.static(path.join(dirname, 'public')));

mongoose.connect('mongodb://mongo:27017/livres', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connecté à MongoDB');
  })
  .catch((err) => {
    console.log('Erreur de connexion:', err);
  });

app.use('/api', bookRoutes);
const port = 3000;
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
