const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const cors = require('cors');


const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

const sequelize = new Sequelize('students_data', 'root', 'zainisana27', {
    host: '127.0.0.1',
    dialect: 'mysql'
  });


  const Student = sequelize.define('student', {}, { tableName: 'students', timestamps: false });

  app.get('/students', async (req, res) => {
    try {
      const students = await Student.findAll({attributes: ['id' , 'name' , 'marks']});
      res.json(students);
    } catch (err) {
      console.error('Error fetching students:', err);
      res.status(500).json({ error: 'Error fetching students' });
    }
  });
app.listen(port);
