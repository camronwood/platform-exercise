const routesCatchall = (router) => {
  // Catch all
  router.get('*', (req, res) => {
    res.status(404).send('No route found');
  });
  router.post('*', (req, res) => {
    res.status(404).send('No route found');
  });
  router.put('*', (req, res) => {
    res.status(404).send('No route found');
  });
  router.patch('*', (req, res) => {
    res.status(404).send('No route found');
  });
  router.delete('*', (req, res) => {
    res.status(404).send('No route found');
  });
};

module.exports = routesCatchall;
