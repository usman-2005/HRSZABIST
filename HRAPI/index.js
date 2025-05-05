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




const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log(`connect successfully...on PORT ${PORT}`)
});