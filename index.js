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
    res.header('Access-Control-Allow-Origin', 'https://trung-spice.myshopify.com');
    res.header('Access-Control-Allow-Origin', 'https://vnspice.myshopify.com');
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