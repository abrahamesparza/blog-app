const cluster = require('cluster');
const os = require('os');
const next = require('next');

const cpuCount = os.cpus().length;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const port = process.env.PORT || 3000;

if (cluster.isMaster && process.env.HEROKU !== 'true') {
    console.log(`Master ${process.pid} is running`);

    for (let i = 0; i < cpuCount; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died. Starting a new worker...`);
        cluster.fork();
    });
} else {
    app.prepare().then(() => {
        const express = require('express');
        const server = express();

        server.all('*', (req, res) => {
            return handle(req, res);
        });

        server.listen(port, () => {
            console.log(`Worker ${process.pid} is listening on port ${port}`);
        });

        process.on('SIGTERM', () => {
            console.log(`Worker ${process.pid} is shutting down...`);
            process.exit(0);
        });
    });
}
