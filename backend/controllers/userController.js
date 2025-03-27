const User = require('../models/user');
const esClient = require('../config/elasticsearch');

exports.searchUsers = async (req, res) => {
  try {
    const { query } = req.query;
    
    const { body } = await esClient.search({
      index: 'users',
      body: {
        query: {
          multi_match: {
            query: query,
            fields: ['firstName', 'lastName', 'email', 'researchInterests']
          }
        }
      }
    });

    const hits = body.hits.hits.map(hit => hit._source);
    res.json(hits);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate('affiliations')
      .populate('socialLinks');
      
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Autres méthodes CRUD...