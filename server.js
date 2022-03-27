const http = require('http');
const app = require('./src/app');
require('dotenv').config({ path: './src/config/.env' });
require('./src/database/connection');


const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`App is up and running on port ${PORT}`);
})