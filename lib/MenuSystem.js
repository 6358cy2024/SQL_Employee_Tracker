const inquirer = require('inquirer');
const client = require('../db/connection');
const Query = require('./Query');//do not {}, that's default export
require('console.table');

class MenuSystem {
    static async showAllEmployees() {
        console.log('test');
        const sql = `SELECT * FROM employee;`
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
        const answerObj = await inquirer.prompt([
            {
                name: 'dName',
                message:'\nWhat is the name of the department you want to add?'
            }
        ]);
        const sql = `SELECT dName AS department_name FROM departments`
        const { rows:departments } = client.query(sql);
        await Query.addDepartment(answerObj)

    }
    static async addRole() {
        const { rows:roles } = client.query(sql);
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
                choices: departments.map(departmentsObj => {
                    return {
                        name: departmentsObj.department_name,
                        value: departmentsObj.department_id
                    }
                })
            }
        ]);
        
        await Query.addRole(answerObj)
    }
    static async addEmployee() {
        const { rows:employees } = await client.query(`SELECT * FROM employee`);//getting the employees
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
                .concat({ name: 'None', value: null })
            }
        ])
        const eSql = `SELECT 
            e.id AS employee_id,
            CONCAT(e.first_name, ' ', e.last_name) AS full_name
        FROM employee AS e;`;
        const rSql = `
        SELECT 
            r.id AS role_id,
            r.title AS role_title
        FROM roles AS r;`;
        
        await Query.addEmployee(answerObj);
    }
    static async updateEmployee() {

        const answerObj = await inquirer.prompt([])
        
    }
}

module.exports = MenuSystem;