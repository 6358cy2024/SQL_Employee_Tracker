const {Pool} = require('pg');
const client = new Pool({
    user: 'postgres',
    password: 'pass',
    database: 'students_app_db',
});

module.exports = client;