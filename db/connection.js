const {Client} = require('pg');
const client = new Client({
    user: 'postgres',
    password: 'pass',
    database: 'employees_app_db'
});

module.exports = client;