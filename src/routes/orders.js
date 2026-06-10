const express = require('express');
const router = express.Router();

const orders = [
  { id: 1, customerId: 42, items: [{ productId: 1, qty: 1 }], status: 'shipped', total: 1299.99 },
  { id: 2, customerId: 7, items: [{ productId: 2, qty: 3 }], status: 'pending', total: 89.97 },
];

let nextId = 3;

/**
 * @openapi
 * /orders:
 *   get:
 *     summary: List all orders
 *     tags: [Orders]
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, shipped, delivered, cancelled]
 *         description: Filter by order status
 *     responses:
 *       200:
 *         description: A list of orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 */
router.get('/', (req, res) => {
  const { status } = req.query;
  const result = status ? orders.filter(o => o.status === status) : orders;
  res.json(result);
});

/**
 * @openapi
 * /orders/{id}:
 *   get:
 *     summary: Get an order by ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Order found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: Order not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id', (req, res) => {
  const order = orders.find(o => o.id === parseInt(req.params.id));
  if (!order) return res.status(404).json({ message: 'Order not found' });
  res.json(order);
});

/**
 * @openapi
 * /orders:
 *   post:
 *     summary: Place a new order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderInput'
 *     responses:
 *       201:
 *         description: Order placed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/', (req, res) => {
  const { customerId, items } = req.body;
  if (!customerId || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: 'customerId and at least one item are required' });
  }
  const total = items.reduce((sum, i) => sum + (i.unitPrice ?? 0) * i.qty, 0);
  const order = { id: nextId++, customerId, items, status: 'pending', total };
  orders.push(order);
  res.status(201).json(order);
});

module.exports = router;
