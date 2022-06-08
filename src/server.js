const Hapi = require('@hapi/hapi');
const mysql = require('mysql');
const routes = require('./routes');

const app = Hapi();
const pool = mysql.createPool({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  socketPath: `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`,
});

app.use(Hapi.json());
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Dinara listing on port ${port}`);
});

app.get('/', async (req, res) => {
  res.json({ status: 'Dinara is ready' });
});

app.get('/:monument', async (req, res) => {
  const query = 'SELECT * FROM monument WHERE name = ?';
  pool.query(query, [req.params.monument], (error, result) => {
    if (!result[0]) {
      res.json({ status: 'not found!' });
    } else {
      res.json(result[0]);
    }
  });
});

const init = async () => {
  const server = Hapi.server({
    port: 5000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  server.route(routes);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
