import Server from './services/server'
import config from  './config/index'


Server.listen(config.PORT, () =>
  console.log('Server up en puerto', config.PORT)
);
Server.on('error', (err) => {
  console.log('ERROR ATAJADO', err);
});

