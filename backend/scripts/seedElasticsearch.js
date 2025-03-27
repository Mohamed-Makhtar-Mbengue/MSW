// backend/scripts/seedElasticsearch.js
const esClient = require('../config/elasticsearch');
const User = require('../models/user');

async function seed() {
  try {
    // Vérifier si l'index existe déjà
    const { body: exists } = await esClient.indices.exists({ index: 'users' });
    
    if (exists) {
      await esClient.indices.delete({ index: 'users' });
    }

    // Créer l'index avec mapping
    await esClient.indices.create({
      index: 'users',
      body: {
        mappings: {
          properties: {
            firstName: { type: 'text' },
            lastName: { type: 'text' },
            email: { type: 'keyword' },
            researchInterests: { type: 'text' }
          }
        }
      }
    });

    // Récupérer tous les utilisateurs de MongoDB
    const users = await User.find({});

    // Indexer chaque utilisateur dans ElasticSearch
    const body = users.flatMap(user => [
      { index: { _index: 'users', _id: user._id.toString() } },
      {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        researchInterests: user.researchInterests
      }
    ]);

    if (body.length > 0) {
      const { body: response } = await esClient.bulk({ refresh: true, body });
      console.log('ElasticSearch seeding completed:', response);
    } else {
      console.log('No users to index');
    }
  } catch (error) {
    console.error('Error seeding ElasticSearch:', error);
  }
}

seed();