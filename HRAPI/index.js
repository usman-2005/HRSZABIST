const express= require('express');
const cors= require('cors');
const pool=require('./db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/',async(req,res)=>{
    try{
        res.json('WELCOME TO HR API');
    }catch(err){        
        res.status(500).json({Error:err.message});

    }
});

app.get('/emp',async(req,res)=>{
    try{
        const result = await pool.query('select * from employees');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/country',async(req,res)=>{
    try{
        const result = await pool.query('select * from countries');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/loc',async(req,res)=>{
    try{
        const result = await pool.query('select * from locations');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/dep',async(req,res)=>{
    try{
        const result = await pool.query('select * from departments');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});
app.get('/totalemp',async(req,res)=>{
    try{
        const result = await pool.query('select count(employee_id) from employees');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/querry40',async(req,res)=>{
    try{
        const result = await pool.query('select e.*, l.city, c.country_name from employees e join departments d on e.department_id = d.department_id join locations l on d.location_id = l.location_id join countries c on l.country_id = c.country_id limit 10;');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

                app.get('/querry41',async(req,res)=>{
                try{
                    const result = await pool.query('  select jh.*, e.first_name, e.last_name from job_history jh join employees e on jh.employee_id = e.employee_id limit 10;');
                    res.json(result.rows);
                }catch(err){
                    res.status(500).json({Error:err.message});
                }});

                app.get('/querry42',async(req,res)=>{
                try{
                    const result = await pool.query(' select e.*,jh.* from employees e left join job_history jh on e.employee_id = jh.employee_id limit 10;');
                    res.json(result.rows);
                }catch(err){
                    res.status(500).json({Error:err.message});
                }});

                app.get('/querry43',async(req,res)=>{
                try{
                    const result = await pool.query('  Select e.*,jh.*,d.department_name from employees e left join job_history jh on e.employee_id = jh.employee_id join departments d on e.department_id = d.department_id limit 10;');
                    res.json(result.rows);
                }catch(err){
                    res.status(500).json({Error:err.message});
                }});
app.get('/querry44', async (req, res) => {
    try {
        const result = await pool.query(`SELECT e.employee_id, e.first_name, e.last_name,
       jh.start_date, jh.end_date,
       d.department_name,
       l.city, l.state_province
       FROM employees e
       JOIN job_history jh ON e.employee_id = jh.employee_id
       JOIN departments d ON jh.department_id = d.department_id
       JOIN locations l ON d.location_id = l.location_id;`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/querry45', async (req, res) => {
    try {
        const result = await pool.query(`SELECT e.employee_id, e.first_name, e.last_name,
       jh.start_date, jh.end_date,
       c.country_name
       FROM employees e
       JOIN job_history jh ON e.employee_id = jh.employee_id
       JOIN departments d ON jh.department_id = d.department_id
       JOIN locations l ON d.location_id = l.location_id
       JOIN countries c ON l.country_id = c.country_id;`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/querry46', async (req, res) => {
    try {
        const result = await pool.query(`SELECT jh.employee_id, e.first_name, e.last_name,
       jh.start_date, jh.end_date,
       d.department_name
       FROM job_history jh
       JOIN employees e ON jh.employee_id = e.employee_id
       JOIN departments d ON jh.department_id = d.department_id;`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});


                app.get('/querry47',async(req,res)=>{
                try{
                    const result = await pool.query('select jh.*, e.first_name, e.last_name, j.job_title from job_history jh join employees e on jh.employee_id = e.employee_id join jobs j on jh.job_id = j.job_id limit 10;');
                    res.json(result.rows);
                }catch(err){
                    res.status(500).json({Error:err.message});
                }});
                app.get('/querry48', async (req, res) => {
    try {
        const result = await pool.query(`SELECT jh.employee_id, e.first_name, e.last_name,
       j.job_title,
       d.department_name,
       jh.start_date, jh.end_date
       FROM job_history jh
       JOIN employees e ON jh.employee_id = e.employee_id
       JOIN jobs j ON jh.job_id = j.job_id
       JOIN departments d ON jh.department_id = d.department_id;`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/querry49', async (req, res) => {
    try {
        const result = await pool.query(`SELECT jh.employee_id, e.first_name, e.last_name,
       j.job_title,
       l.city, l.state_province,
       jh.start_date, jh.end_date
       FROM job_history jh
       JOIN employees e ON jh.employee_id = e.employee_id
       JOIN jobs j ON jh.job_id = j.job_id
       JOIN departments d ON jh.department_id = d.department_id
       JOIN locations l ON d.location_id = l.location_id; `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});


                app.get('/querry50',async(req,res)=>{
                try{
                    const result = await pool.query('  select jh.*, e.first_name, e.last_name, j.job_title, c.country_name from job_history jh join employees e on jh.employee_id = e.employee_id join jobs j on jh.job_id = j.job_id join departments d on jh.department_id = d.department_id join locations l on d.location_id = l.location_id join countries c on l.country_id = c.country_id limit 10;');
                    res.json(result.rows);
                }catch(err){
                    res.status(500).json({Error:err.message});
                }});
app.get('/querry51', async (req, res) => {
    try {
        const result = await pool.query(`SELECT r.region_name, c.country_name, l.city, l.state_province FROM regions r JOIN countries c ON r.region_id = c.region_id JOIN locations l ON c.country_id = l.country_id;`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});


                app.get('/querry52',async(req,res)=>{
                try{
                    const result = await pool.query(' Select c.country_name,r.region_name,l.city from countries c join regions r on c.region_id=r.region_id join locations l on c.country_id = l.country_id;  ');
                    res.json(result.rows);
                }catch(err){
                    res.status(500).json({Error:err.message});
                }});


                app.get('/querry53',async(req,res)=>{
                try{
                    const result = await pool.query(' Select l.city,c.country_name,r.region_name from locations l join countries c on l.country_id=c.country_id join regions r on c.region_id =r.region_id;');
                    res.json(result.rows);
                }catch(err){
                    res.status(500).json({Error:err.message});
                }});
                app.get('/querry54', async (req, res) => {
    try {
        const result = await pool.query(`SELECT d.department_name, e.first_name, e.last_name, l.city  FROM departments dJOIN employees e ON d.department_id = e.department_id JOIN locations l ON d.location_id = l.location_id;`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});


                app.get('/querry55',async(req,res)=>{
                try{
                    const result = await pool.query(' select e.*, d.department_name, l.city, c.country_name from employees e join departments d on e.department_id = d.department_id join locations l on d.location_id = l.location_id join countries c on l.country_id = c.country_id limit 10;');
                    res.json(result.rows);
                }catch(err){
                    res.status(500).json({Error:err.message});
                }});

                 app.get('/querry56',async(req,res)=>{
                try{
                    const result = await pool.query(' select e.*, m.first_name as manager_first_name, d.department_name, l.city from employees e left join employees m on e.manager_id = m.employee_id join departments d on e.department_id = d.department_id join locations l on d.location_id = l.location_id limit 10;');
                    res.json(result.rows);
                }catch(err){
                    res.status(500).json({Error:err.message});
                }});


                 app.get('/querry57',async(req,res)=>{
                try{
                    const result = await pool.query('  Select e.*,j.job_title,d.department_name ,l.city from employees e join jobs j on e.job_id =j.job_id join departments d on e.department_id = d.department_id join locations l on d.location_id = l.location_id limit 15;');
                    res.json(result.rows);
                }catch(err){
                    res.status(500).json({Error:err.message});
                }});

                 app.get('/querry58',async(req,res)=>{
                try{
                    const result = await pool.query('Select e.*, j.job_title,d.department_name,m.first_name as manager_name from employees e join jobs j on e.job_id = j.job_id join departments d on e.department_id = d.department_id left join employees m on e.manager_id = m.employee_id limit 10;');
                    res.json(result.rows);
                }catch(err){
                    res.status(500).json({Error:err.message});
                }});

                app.get('/querry59',async(req,res)=>{
                try{
                    const result = await pool.query(' Select e.*,j.job_title,d.department_name, m.first_name as manager_name,l.city from employees e join jobs j on e.job_id=j.job_id join departments d on e.department_id = d.department_id left join employees m on e.manager_id = m.employee_id join locations l on d.location_id=l.location_id limit 5;');
                    res.json(result.rows);
                }catch(err){
                    res.status(500).json({Error:err.message});
                }});


                app.get('/querry60',async(req,res)=>{
                try{
                    const result = await pool.query('Select c.country_name from countries c where c.region_id =1;');
                    res.json(result.rows);
                }catch(err){
                    res.status(500).json({Error:err.message});
                }});

app.get('/querry61',async(req,res)=>{
                try{
                    const result = await pool.query(' Select d.department_name,l.city from departments d join locations l on d.location_id=l.location_id where l.city like ‘N%’;');
                    res.json(result.rows);
                }catch(err){
                    res.status(500).json({Error:err.message});
                }});


                
                app.get('/querry62',async(req,res)=>{
                try{
                    const result = await pool.query('Select e.first_name,e.last_name,d.department_name from employees e join departments d on e.department_id=d.department_id where d.manager_id in (select employee_id from employees where commission_pct >0.15) limit 10;');
                    res.json(result.rows);
                }catch(err){
                    res.status(500).json({Error:err.message});
                }});

                app.get('/querry63',async(req,res)=>{
                try{
                    const result = await pool.query('Select distinct j.job_title from employees e join jobs j on e.job_id=j.job_id where e.employee_id in(select manager_id from employees where manager_id is not null);');
                    res.json(result.rows);
                }catch(err){
                    res.status(500).json({Error:err.message});
                }});

                  app.get('/querry64', async (req, res) => {
    try {
        const result = await pool.query(`SELECT l.postal_code FROM locations l JOIN countries c ON l.country_id = c.country_id JOIN regions r ON c.region_id = r.region_id WHERE r.region_name = 'Asia';`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

                 app.get('/querry65',async(req,res)=>{
                try{
                    const result = await pool.query('Select distinct d.department_name from departments d join employees e on d.department_id=e.department_id where e.commission_pct < (select AVG (commission_pct) from employees);');
                    res.json(result.rows);
                }catch(err){
                    res.status(500).json({Error:err.message});
                }});

                app.get('/querry66',async(req,res)=>{
                try{
                    const result = await pool.query('Select distinct j.job_title from employees e join jobs j on e.job_id=j.job_id where e.salary> (select avg(salary) from employees where department_id = e.department_id) limit 6;');
                    res.json(result.rows);
                }catch(err){
                    res.status(500).json({Error:err.message});
                }});


                 app.get('/querry67',async(req,res)=>{
                try{
                    const result = await pool.query('Select employee_id from employees where department_id is null;');
                    res.json(result.rows);
                }catch(err){
                    res.status(500).json({Error:err.message});
                }});


                
                 app.get('/querry68',async(req,res)=>{
                try{
                    const result = await pool.query('Select e.first_name,e.last_name from employees e join job_history jh on e.employee_id = jh.employee_id group by e.employee_id having count(jh.job_id)>1;');
                    res.json(result.rows);
                }catch(err){
                    res.status(500).json({Error:err.message});
                }});


                 
                 app.get('/querry69',async(req,res)=>{
                try{
                    const result = await pool.query('Select d.department_name,count(e.employee_id) as employee_count from departments d left join employees e on d.department_id=e.department_id group by d.department_name limit 10;');
                    res.json(result.rows);
                }catch(err){
                    res.status(500).json({Error:err.message});
                }});


                app.get('/querry70',async(req,res)=>{
                try{
                    const result = await pool.query('Select j.job_title ,sum(e.salary) as total_salary from jobs j join employees e on j.job_id=e.job_id group by j.job_title limit 10;');
                    res.json(result.rows);
                }catch(err){
                    res.status(500).json({Error:err.message});
                }});


                app.get('/querry71',async(req,res)=>{
                try{
                    const result = await pool.query('Select department_id,avg(commission_pct) as avg_commission_pct from employees group by department_id limit 10;');
                    res.json(result.rows);
                }catch(err){
                    res.status(500).json({Error:err.message});
                }});

                 app.get('/querry72',async(req,res)=>{
                try{
                    const result = await pool.query('   Select c.country_name,max(e.salary) as max_salary from employees e join departments d on e.department_id=d.department_id join locations l on d.location_id=l.location_id join countries c on l.country_id=c.country_id group by c.country_name;');
                    res.json(result.rows);
                }catch(err){
                    res.status(500).json({Error:err.message});
                }});


                 
               app.get('/querry73', async (req, res) => {
    try {
        const result = await pool.query(`SELECT j.job_title, d.department_name,CONCAT(e.first_name, ' ', e.last_name) AS full_name,jh.start_date FROM job_history jh JOIN employees e ON jh.employee_id = e.employee_id   JOIN jobs j ON jh.job_id = j.job_id   JOIN departments d ON jh.department_id = d.department_id   WHERE jh.start_date >= '1993-01-01' AND jh.end_date <= '1997-08-31';`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});


        app.get('/querry74',async(req,res)=>{
    try{
        const result = await pool.query('Select c.country_name,l.city,d.department_name,count(e.employee_id) as employee_count from countries c join locations l on c.country_id=l.country_id join departments d on l.location_id= d.location_id join employees e on d.department_id= e.department_id group by c.country_name,l.city,d.department_id having count(e.employee_id)>=2;');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }});


    app.get('/querry75',async(req,res)=>{
    try{
        const result = await pool.query('Select e.first_name,e.last_name,j.job_title,jh.start_date,jh.end_date from employees e join job_history jh on e.employee_id=jh.employee_id join jobs j on jh.job_id=j.job_id where e.commission_pct is null limit 6;');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }});


       app.get('/querry76', async (req, res) => {
    try {
        const result = await pool.query(`SELECT e.employee_id, e.first_name || ' ' || e.last_name AS full_name,   c.country_name      FROM employees e    JOIN departments d ON e.department_id = d.department_id   JOIN locations l ON d.location_id = l.location_id   JOIN countries c ON l.country_id = c.country_id; `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});


    app.get('/querry77',async(req,res)=>{
    try{
        const result = await pool.query('Select e.first_name,e.last_name,e.salary,e.department_id from employees e where e.salary = (select min(salary) from employees where department_id=e.department_id) limit 10;');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }});



    app.get('/querry78',async(req,res)=>{
    try{
        const result = await pool.query('Select * from employees where salary = (select distinct salary from employees order by salary desc limit 1 offset 2) limit 5;');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }});

   
   app.get('/querry79', async (req, res) => {
    try {
        const result = await pool.query(`SELECT e.employee_id, e.first_name, e.last_name, e.salary FROM employees e WHERE e.salary > (SELECT AVG(salary) FROM employees) AND e.department_id IN (SELECT DISTINCT department_id FROM employees WHERE UPPER(first_name) LIKE '%J%' OR UPPER(last_name) LIKE '%J%');`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

     



    app.get('/querry80', async (req, res) => {
    try {
        const result = await pool.query(`SELECT e.first_name, e.last_name, e.employee_id, j.job_title FROM employees e JOIN jobs j ON e.job_id = j.job_id JOIN departments d ON e.department_id = d.department_id JOIN locations l ON d.location_id = l.location_id WHERE l.city = 'Toronto';`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});



const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log(`connect successfully...on PORT ${PORT}`)
});