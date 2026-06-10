const express = require('express');
const app = express();

app.use(express.json());

app.use('/products', require('./routes/products'));
app.use('/orders', require('./routes/orders'));
app.use('/users', require('./routes/users'));

app.get('/health', (req, res) => res.json({ status: 'ok' }));

module.exports = app;
