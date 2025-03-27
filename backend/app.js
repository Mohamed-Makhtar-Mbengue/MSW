require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { Client } = require('@elastic/elasticsearch');

// Initialisation de l'application
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connexion à MongoDB (version modernisée)
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mysciencework')
  .then(() => console.log('✅ Connecté à MongoDB'))
  .catch(err => {
    console.error('❌ Erreur de connexion MongoDB:', err);
    process.exit(1);
  });

// Configuration ElasticSearch
const esClient = new Client({ 
  node: process.env.ELASTICSEARCH_URL || 'http://localhost:9200' 
});

// Vérification connexion ElasticSearch
esClient.ping()
  .then(() => console.log('✅ Connecté à ElasticSearch'))
  .catch(err => console.error('❌ Erreur ElasticSearch:', err));

// Rend le client ES accessible dans les routes
app.set('esClient', esClient);

// Import des routes
const usersRouter = require('./routes/users');

// Routes API
app.use('/api/users', usersRouter);

// Route de santé
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    mongo: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    elasticsearch: esClient ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString()
  });
});

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error('⚠️ Erreur:', err.stack);
  res.status(500).json({ 
    error: 'Internal Server Error',
    message: err.message 
  });
});

// Démarrer le serveur
const server = app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});

// Export pour les tests
module.exports = {
  app,
  server,
  esClient,
  mongoose
};