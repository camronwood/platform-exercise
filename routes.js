const routes = (router) => {
  // USER ROUTES
  router.post('/users/registration', (req, res) => {
    res.status(200).json({ up: 'true'});
  });

  router.post('/users/login', (req, res) => {
    res.status(200).json({ up: 'true'});
  });

  router.get('/users/logout/:id', (req, res) => {
    res.status(200).json({ up: 'true'});
  });

  router.put('/users/:id', (req, res) => {
    res.status(200).json({ up: 'true'});
  });

  router.delete('/users/:id', (req, res) => {
    res.status(200).json({ up: 'true'});
  });

  // Simple GET route to check the service is running
  router.get('/', (req, res) => {
    res.status(200).send('FENDER CODING CHALLANGE');
  });
};

module.exports = routes;
