const inquirer = require('inquirer');
const client = require('./db/connection');
const MenuSystem = require('./lib/MenuSystems');
//put the inquirere within the client connect
//option list then loop back
async function showMainMenu() {
    const answerObj = inquirer.prompt({
        name: 'choice',
        message: 'Choose an option from the menu:',
        type: 'list',
        choices: ['View Departments', 'View Roles', 'View Employees', 'Add Department', 'Add Role', 'Add Employee', 'Update Employee']
    })
    switch (answerObj.choice) {
        case 'View Departments':
            await MenuSystem.showAllDepartments();
            showMainMenu();
            
        case 'View Roles':
            await MenuSystem.showAllRoles();
            showMainMenu();
        case 'View Employees':
            await MenuSystem.showAllEmployees();
            showMainMenu();
            
    }

}

async function init() {
    await client.connect()
    console.log('Menu Active!');

    showMainMenu();
}
init();

