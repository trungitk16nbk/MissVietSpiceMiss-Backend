'use strict'; 
require("dotenv").config();
const express = require('express');
const app = express();
const cors = require('cors'); // Đảm bảo bạn đã cài đặt thư viện cors

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const port = process.env.PORT || 3000; 
// Cấu hình tùy chỉnh
app.options('/charity', cors()); // Xác định các tùy chọn cho Preflight request
app.use((req, res, next) => {
    const allowedOrigins = [
        'https://trung-spice.myshopify.com',
        'https://vnspice.myshopify.com'
        // Thêm các tên miền khác nếu cần
    ];

    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Origin', origin);
    }

    // Các cài đặt CORS khác...
    next();
});


app.get('/createTables', (req, res) => { 
    let models = require('./models');
    models.sequelize.sync().then(() => {
        res.send('tables created!')
    })
})

// routers
app.get('/', (req, res) => {
    res.send('hello world');
})

app.use('/charity', require('./routes/indexRouter'));


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});