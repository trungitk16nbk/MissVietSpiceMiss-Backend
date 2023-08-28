'use strict';
require("dotenv").config();
const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const port = process.env.PORT || 3000;

// Cấu hình tùy chỉnh
app.use(cors({
    origin: function (origin, callback) {
        const allowedOrigins = [
            'https://trung-spice.myshopify.com',
            'https://vnspice.com/'
            // Thêm các tên miền khác nếu cần
        ];

        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));

app.get('/createTables', (req, res) => { 
    let models = require('./models');
    models.sequelize.sync().then(() => {
        res.send('tables created!')
    });
});

// routers
app.get('/', (req, res) => {
    res.send('hello world');
});

app.use('/charity', require('./routes/indexRouter'));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
