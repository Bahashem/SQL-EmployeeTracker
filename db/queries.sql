SELECT *
FROM company_names;

SELECT department, COUNT(id) AS number_courses
FROM company_names
GROUP BY department;

SELECT department, SUM(total_enrolled) AS sum_enrolled
FROM company_names
GROUP BY department;
