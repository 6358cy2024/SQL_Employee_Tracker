const client = require('../db/connection')

class Query {

    static async addEmployee({first_name, last_name, role_id, manager_id}) {
        const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)`
        await client.query(sql, [first_name, last_name, role_id, manager_id]);
        console.log('\nNew Employee Added!');
    }

    static async addRole({title, salary, department_id}) {
        const sql = `INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3)`;
        await client.query(sql, [title, salary, department_id])
        console.log('\nRole Added Successfully!')
    }

    static async addDepartment({dName}) {
        const sql = `INSERT INTO departments (dName) VALUES ($1)`
        await client.query(sql, [dName])
        console.log('\nDepartment successfully added!')
    }

    static async updateEmployee({employee_id, role_id}) {
        const sql = `
        UPDATE employee
        SET role_id = $1
        WHERE id = $2;`;
        await client.query(sql, [employee_id, role_id])
        console.log('\nInformation Updated')
    }

}
module.exports = Query;