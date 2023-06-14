const router = require('express').Router();

router.route('/').get((_req, res) => res.status(200).json({
  message: 'Welcome!'
}));

module.exports = router;
