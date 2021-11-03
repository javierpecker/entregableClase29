import cluster from 'cluster';
import os from 'os'
import Server from './services/server'
import config from  './config/index'

const argumentos = process.argv.splice(2);
const nCPU = os.cpus().length;
const clusterMode = argumentos.includes("CLUSTER")


if(clusterMode && cluster.isMaster) {
  console.log(`NUMERO DE CPUS ===> ${nCPU}`);
  console.log(`PID MASTER ${process.pid}`);

  for (let i = 0; i < nCPU; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker) => {
    console.log(`Worker ${worker.process.pid} died at ${Date()}`);
    cluster.fork();
  });

}
else {
  Server.listen(config.PORT, () =>
    console.log(`Servidor express escuchando en el puerto ${config.PORT} - PID WORKER ${process.pid}`)
  );
  Server.on('error', (err) => {
    console.log('ERROR ATAJADO', err);
  });
};

