const inquirer = require('inquirer');
const client = require('../db/connection');
//const Query = require('./Query');//do not {}, that's default export
require('console.table');

class MenuSystem {
    static async showAllEmployees() {
        const sql = `SELECT * FROM employees;`
        const data = await client.query(sql)

        console.table(data.rows)
        
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
                message:'What is their fist name?'
            },
            {
                name: 'last_name',
                message: 'What is their last name?'
            }
        ])
        
    }
    static async updateEmployee() {

        const answerObj = await inquirer.prompt([])
        
    }
}

module.exports = MenuSystem;