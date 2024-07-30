INSERT INTO department (dName) VALUES
    ('Sales'),
    ('Finance'),
    ('Engineering'),
    ('Legal');

INSERT INTO roles (title, salary, department_id) VALUES
    ('Sales Lead', 120000, 1), --1
    ('Salesperson', 100000, 1), --2
    ('Lead Engineer', 150000, 2), --3
    ('Software Engineer', 130000, 2),  --4
    ('Account Manager', 170000, 3), --5
    ('Accountant', 145000, 3),  --6
    ('Legal Team Leader', 200000, 4), --7
    ('Lawyer', 175000, 4); --8


INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
    ('John', 'Mike', 2, 5),--This means Madison is John's manager
    ('Wyatt', 'Johnson', 4, 6),
    ('Matthew', 'Winters', 6, 7),
    ('Nancy', 'Smith', 8, 8),
    ('Madison', 'Lopaz', 1, null),
    ('Alex', 'Rogers', 3, null),
    ('Rachel', 'Taylor', 5, null),
    ('Noah', 'Stevens', 7, null);
