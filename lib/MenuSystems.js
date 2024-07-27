const inquirer = require('inquirer');
const client = require('../db/connection');
const Query = require('./Query');//do not {}, that's default export
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
                ON r.department_id AS d.id
        `;
        const data = await client.query(sql)
        console.table(data.rows);
    }

}

module.exports = MenuSystem;