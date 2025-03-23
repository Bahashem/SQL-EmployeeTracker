INSERT INTO department (name)
VALUES
('Human Resources'),
('Engineering'),
('Marketing');

INSERT INTO role (title, salary, department_id)
VALUES 
('HR Manager', 68000,1),
('Software Engineer', 85000,2),
('Marketing Coordinator', 55000,3);
       
 INSERT INTO employee (first_name, last_name, role_id, manager_id)
 VALUES 
 ('Traci ', 'Johnson', 1, NULL)
 ('Barry', 'Smith', 2, NULL),
 ('Carol', 'Thomas', 3, NULL);