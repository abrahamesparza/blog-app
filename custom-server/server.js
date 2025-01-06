const cluster = require('cluster');
const os = require('os');
const next = require('next');

const cpuCount = os.cpus().length;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);

    for (let i = 0; i < cpuCount; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`);
        console.log('Starting a new worker...');
        cluster.fork();
    });
} else {
    app.prepare().then(() => {
        const express = require('express');
        const server = express();

        server.all('*', (req, res) => {
            return handle(req, res);
        });

        server.listen(3000, () => {
            console.log(`Worker ${process.pid} is listening on port 3000`);
        });
    });
}