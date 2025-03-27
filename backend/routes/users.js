const express = require('express');
const router = express.Router();

router.get('/search', async (req, res, next) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ error: 'Paramètre "query" requis' });
    }

    const esClient = req.app.get('esClient');
    const { body } = await esClient.search({
      index: 'users',
      body: {
        _source: ["firstName", "lastName", "email", "researchInterests"],
        query: {
          multi_match: {
            query: query,
            fields: ['firstName^3', 'lastName^3', 'email', 'researchInterests'],
            fuzziness: 'AUTO'
          }
        }
      }
    });

    const results = body.hits.hits.map(({ _id, _source }) => ({
      id: _id,
      ..._source
    }));

    res.json({
      count: body.hits.total.value,
      results
    });
  } catch (error) {
    next(error); // Passe à middleware d'erreur
  }
});

module.exports = router;