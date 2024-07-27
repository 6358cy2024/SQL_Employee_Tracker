const { Client } = require('pg');
const inquirer = require('inquirer');
const client = new Client({
    user: 'postgres',
    password: 'pass',
    database: 'employee_app_db'
});
//put the inquirere within the client connect
//option list then loop back
client.connect()
   .then(async () => {
        console.log('db connected');
        const answerObj = inquirer.prompt({
            name: 'choice',
            message: 'Choose an option from the menu:',
            type: 'list',
            choices: ['View Departments', 'View Roles', 'View Employees', 'Add Department', 'Add Role', 'Add Employee', 'Update Employee']
        })

   });
