const express = require('express');
const app = express();

app.disable('x-powered-by');
app.use(express.json());

app.use('/products', require('./routes/products'));
app.use('/orders', require('./routes/orders'));
app.use('/users', require('./routes/users'));
app.use('/reviews', require('./routes/reviews'));

app.get('/health', (req, res) => res.json({ status: 'ok' }));

module.exports = app;
