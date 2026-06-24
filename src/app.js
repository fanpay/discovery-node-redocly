const express = require('express');
const app = express();

app.disable('x-powered-by');
app.use(express.json());

app.use('/products', require('./routes/products'));
app.use('/orders', require('./routes/orders'));
app.use('/users', require('./routes/users'));
app.use('/reviews', require('./routes/reviews'));

app.get('/health', (req, res) => res.json({ status: 'ok' }));

/**
 * @openapi
 * /status:
 *   get:
 *     summary: API status and version info
 *     tags: [General]
 *     responses:
 *       200:
 *         description: Current API status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 *                 version:
 *                   type: string
 *                   example: 2.0.0
 *                 message:
 *                   type: string
 *                   example: Discovery Store API is running
 */
app.get('/status', (req, res) => res.json({ status: 'ok', version: '2.0.0', message: 'Discovery Store API is running' }));

module.exports = app;
