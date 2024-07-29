const inquirer = require('inquirer');
const client = require('./db/connection');
const MenuSystem = require('./lib/MenuSystem');
//put the inquirere within the client connect
//option list then loop back
async function showMainMenu() {
    const answerObj = await inquirer.prompt({
        name: 'choice',
        message: 'Choose an option from the menu:',
        type: 'list',
        choices: ['View Departments', 'View Roles', 'View Employees', 'Add Department', 'Add Role', 'Add Employee', 'Update Employee']
    })
    switch (answerObj.choice) {
        case 'View Departments':
            await MenuSystem.showAllDepartments();
            showMainMenu();
            break;

        case 'View Roles':
            await MenuSystem.showAllRoles();
            showMainMenu();
            break;

        case 'View Employees':
            await MenuSystem.showAllEmployees();
            showMainMenu();
            break;

        case 'Add Department':
            await MenuSystem.addDepartment();
            showMainMenu();
            break;

        case 'Add Role':
            await MenuSystem.addRole();
            showMainMenu();
            break;

        case 'Add Employee':
            await MenuSystem.addEmployee();
            showMainMenu();
            break;

        case 'Update Employee':
            await MenuSystem.updateEmployee();
            showMainMenu();
            break;

    }

}

async function init() {
    await client.connect()
    console.log('Menu Active!');

    showMainMenu();
}
init();

