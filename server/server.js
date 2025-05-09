const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database configuration
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'Dehemi',
  database: process.env.DB_NAME || 'contract_flow',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Convert pool to use promises
const promisePool = pool.promise();

// Routes
// Projects
app.get('/api/projects', async (req, res) => {
  try {
    const [rows] = await promisePool.query('SELECT * FROM projects');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/projects', async (req, res) => {
  try {
    const {
      project_no,
      project_description,
      district,
      ds_division,
      fund_source,
      vote_details,
      total_cost_estimate,
      beneficiaries,
      output,
      outcome,
      feasibility_studies,
      relevant_pc
    } = req.body;

    const [result] = await promisePool.query(
      'INSERT INTO projects SET ?',
      {
        project_no,
        project_description,
        district,
        ds_division,
        fund_source,
        vote_details,
        total_cost_estimate,
        beneficiaries,
        output,
        outcome,
        feasibility_studies,
        relevant_pc
      }
    );

    res.status(201).json({ message: 'Project created successfully', insertId: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Contractors
app.get('/api/contractors', async (req, res) => {
  try {
    const [rows] = await promisePool.query('SELECT * FROM contractors');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/contractors', async (req, res) => {
  try {
    const {
      projectId,
      dateAwarded,
      contractorName,
      contractNo,
      contractAmount,
      vatDetails,
      contractPeriod,
      performanceBondBank,
      performanceBondAmount,
      performanceBondExpiry
    } = req.body;

    const [result] = await promisePool.query(
      `INSERT INTO contractors SET ?`,
      {
        project_id: projectId,
        date_awarded: dateAwarded,
        contractor_name: contractorName,
        contract_no: contractNo,
        contract_amount: contractAmount,
        vat_details: vatDetails,
        contract_period: contractPeriod,
        performance_bond_bank: performanceBondBank,
        performance_bond_amount: performanceBondAmount,
        performance_bond_expiry: performanceBondExpiry
      }
    );

    res.status(201).json({ message: 'Contractor contract added', id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Advance Payments
app.get('/api/advance-payments', async (req, res) => {
  try {
    const [rows] = await promisePool.query('SELECT * FROM advance_payments');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/advance-payments', async (req, res) => {
  try {
    const [result] = await promisePool.query('INSERT INTO advance_payments SET ?', req.body);
    res.status(201).json({ id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Bill Payments
app.get('/api/bill-payments', async (req, res) => {
  try {
    const [rows] = await promisePool.query('SELECT * FROM bill_payments');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/bill-payments', async (req, res) => {
  try {
    const [result] = await promisePool.query('INSERT INTO bill_payments SET ?', req.body);
    res.status(201).json({ id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Adjustments
app.get('/api/adjustments', async (req, res) => {
  try {
    const [rows] = await promisePool.query('SELECT * FROM adjustments');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/adjustments', async (req, res) => {
  try {
    const [result] = await promisePool.query('INSERT INTO adjustments SET ?', req.body);
    res.status(201).json({ id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Project Summary for Reports
app.get('/api/reports/summary', async (req, res) => {
  try {
    const [projects] = await promisePool.query(`
      SELECT 
        COUNT(*) as total_projects,
        SUM(CASE WHEN status = 'ongoing' THEN 1 ELSE 0 END) as ongoing_projects,
        SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed_projects,
        SUM(total_cost_estimate) as total_value
      FROM projects
    `);
    res.json(projects[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Recent Payments for Reports
app.get('/api/reports/recent-payments', async (req, res) => {
  try {
    const [payments] = await promisePool.query(`
      SELECT 
        date_of_payment as date,
        bill_no,
        bill_amount as amount,
        CASE 
          WHEN net_payment > 0 THEN 'Paid'
          ELSE 'Pending'
        END as status
      FROM bill_payments
      ORDER BY date_of_payment DESC
      LIMIT 5
    `);
    res.json(payments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});