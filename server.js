const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/frontend/dist')));

// Serve frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/frontend/dist', 'index.html'));
});

// MongoDB connection
mongoose.connect('mongodb+srv://sravanikondapallisravani_db_user:3LTzt4JC7ByuisXE@cluster0.y4aytjy.mongodb.net/', {
  dbName: 'hospital_management',
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.log('❌ MongoDB connection error:', err));

// Routes
const patientRoutes = require('./routes/patient');
const doctorRoutes = require('./routes/Doctor');
const appointmentRoutes = require('./routes/Appointment');

app.use('/Patients', patientRoutes);
app.use('/Doctors', doctorRoutes);
app.use('/Appointments', appointmentRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
