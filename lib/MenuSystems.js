const inquirer = require('inquirer');
const client = require('../db/connection');
//const Query = require('./Query');//do not {}, that's default export
require('console.table');

class MenuSystem {
    static async showAllEmployees() {
        const sql = `SELECT
        e.id AS employee_id,
        CONCAT (e.first_name, ' ', e.last_name) AS full_name,
        d.id AS department_id,
        r.id AS role_id,
        m.id AS manager_id,
        salary,
        title, 
        dName
        FROM employee AS e
            JOIN roles as r.id
                ON e.role_id as r.id
        FROM roles as r
            JOIN departments AS d
                ON r.department_id AS d.id;`;
        const data = await client.query(sql)
        console.table(data.rows);
    }
    static async showAllDepartments() {
        const sql = `SELECT
        dName,
        d.id AS department_id
        `;
    }
    static async showAllRoles() {
        const sql = `SELECT
        r.id AS role_id
        salary,

        `;
    }
    static async addDepartment() {
        const answerObj = await inquirer.prompt([
            {
                name: 'dName',
                message:'\nWhat is the name of the department you want to add?'
            }
            
        ]);
        await Query.addDepartment(answerObj)
    }
    static async addRole() {
        const answerObj = await inquirer.prompt([
            {
                name:'title',
                message:'\nWhat is the name of the role you would like to add?'
            }
        ]);
        await Query.addRole(answerObj)
    }
    static async addEmployee() {

        const answerObj = await inquirer.prompt([
            {
                name: 'first_name',
                message:'What is your fist name?'
            },
            {
                name: 'last_name'
            }
        ])
        
    }
    static async updateEmployee() {

        const answerObj = await inquirer.prompt([])
        
    }
}

module.exports = MenuSystem;