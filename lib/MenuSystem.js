const inquirer = require('inquirer');
const client = require('../db/connection');
const Query = require('./Query');//do not {}, that's default export
require('console.table');

class MenuSystem {
    static async showAllEmployees() {
        console.log('test');//combine the first and last names, then get the title of the role before getting the manager names for the manager column
        const sql = `SELECT 
            e.id AS employee_id,
            CONCAT(e.first_name, ' ', e.last_name) AS full_name,
            r.title AS role_title,
            CONCAT(manager.first_name, ' ', manager.last_name) AS manager_name
            FROM employee AS e
                LEFT JOIN employee AS manager 
                    ON e.manager_id = manager.id
                LEFT JOIN roles AS r ON e.role_id = r.id;
                `
        const data = await client.query(sql)
        console.table(data.rows)
        
    }
    static async showAllDepartments() {
        const sql = `SELECT * FROM department;`
        const data = await client.query(sql)
        console.table(data.rows)

    }
    static async showAllRoles() {
        const sql = `SELECT * FROM roles;`
        const data = await client.query(sql)
        console.table(data.rows)

    }
    static async addDepartment() {
        const sql = `SELECT dName AS department_name FROM department`
        const { rows:departments } = await client.query(sql);
        const answerObj = await inquirer.prompt([
            {
                name: 'dName',
                message:'\nWhat is the name of the department you want to add?'
            }
        ]);
        
        await Query.addDepartment(answerObj)

    }
    static async addRole() {
        const { rows:department } =  await client.query(`SELECT id AS department_id, dName AS department_name FROM department`);
        const answerObj = await inquirer.prompt([
            {
                name: 'title',
                message:'\nWhat is the name of the role you would like to add?'
            },
            {
                name: 'salary',
                message: '\nHow much does this role make?'
            },
            {
                name: 'department_id',
                message: '\nWhat department is this role a part of?',
                type: 'list',
                choices: department.map(departmentObj => {
                    return {
                        name: departmentObj.department_name,
                        value: departmentObj.department_id
                    }
                })
                .concat({ name: 'None', value: null })
            }
        ]);
        
        await Query.addRole(answerObj)
    }
    static async addEmployee() {
        const eSql = `SELECT 
            e.id AS employee_id,
            CONCAT(e.first_name, ' ', e.last_name) AS full_name
        FROM employee AS e;`;

        const rSql = `
        SELECT 
            r.id AS role_id,
            r.title AS role_title
        FROM roles AS r;`;

        const { rows:employees } = await client.query(eSql);//getting the employees
        const { rows: roles } = await client.query(rSQL);//get the roles

        const answerObj = await inquirer.prompt([
            {
                name: 'first_name',
                message:'What is their fist name?'
            },
            {
                name: 'last_name',
                message: 'What is their last name?'
            },
            {
                name: 'role_id',
                message: 'What is their role?',
                type: 'list',
                choices: roles.map(rolesObj => {
                    return {
                        name: rolesObj.role_title,
                        value: rolesObj.role_id
                    }
                })
            },
            {
                name: 'manager_id',
                message: 'Who is their manager?',
                type: 'list',
                choices: employees.map(employeesObj => {
                    return {
                        name: employeesObj.full_name,
                        value: employeesObj.employee_id
                    }
                })
                .concat({ name: 'None', value: null })//if no one is selected
            }
        ])

        
        await Query.addEmployee(answerObj);
    }
    static async updateEmployee() {
        
        //re-concat fullname, get e.id, for roles, get the id and title
        const eSql = `
        SELECT 
            e.id AS employee_id,
            CONCAT(e.first_name, ' ', e.last_name) AS full_name
        FROM employee AS e;`;
        const { rows:employees } = await client.query(eSql);
        console.log('employees', employees);
        const rSQL = `
        SELECT 
            id AS role_id,
            title AS role_title
        FROM roles;`;
        const { rows:roles } = await client.query(rSQL);

        const answerObj = await inquirer.prompt([
            {
                name: 'employee_id',
                message: 'Whos information would you like to update?',
                type: 'list',//trying to display every name from the table to a selectable array
                choices: employees.map(employeesObj => {
                    return {
                        name: employeesObj.full_name,
                        value: employeesObj.employee_id
                    }
                })
            },
            {
                name: 'role_id',
                message: 'What is their new role?',
                type: 'list',
                choices: roles.map(rolesObj => {
                    return {
                        name: rolesObj.role_title,
                        value: rolesObj.role_id
                    }
                })
            }
        ]);
        await Query.updateEmployee(answerObj);


        
    }
}

module.exports = MenuSystem;