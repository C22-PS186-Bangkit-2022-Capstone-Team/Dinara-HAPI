const {
  getmonumentByIdHandler,
  getAllmonumentHandler,
} = require('./handler');

const {
  snapClientHandler,
} = require('./auth');

const routes = [
  {
    method: 'GET',
    path: '/eksplore',
    // config: (auth: false),
    handler: () => getAllmonumentHandler,
  },
  {
    method: 'GET',
    path: '/search',
    // config: (auth: false),
    handler: () => getmonumentByIdHandler,
  },
  {
    method: 'POST',
    path: '/feature',
    // config: (auth: false),
    handler: () => snapClientHandler,
  },
];

module.exports = routes;
