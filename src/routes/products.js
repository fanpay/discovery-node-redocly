const express = require('express');
const router = express.Router();

const products = [
  { id: 1, name: 'Laptop Pro', price: 1299.99, category: 'electronics', stock: 45 },
  { id: 2, name: 'Wireless Mouse', price: 29.99, category: 'electronics', stock: 200 },
  { id: 3, name: 'Standing Desk', price: 549.00, category: 'furniture', stock: 12 },
];

let nextId = 4;

/**
 * @openapi
 * /products:
 *   get:
 *     summary: List all products
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category
 *     responses:
 *       200:
 *         description: A list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get('/', (req, res) => {
  const { category } = req.query;
  const result = category
    ? products.filter(p => p.category === category)
    : products;
  res.json(result);
});

/**
 * @openapi
 * /products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
});

/**
 * @openapi
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductInput'
 *     responses:
 *       201:
 *         description: Product created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/', (req, res) => {
  const { name, price, category, stock } = req.body;
  if (!name || price === undefined || !category) {
    return res.status(400).json({ message: 'name, price and category are required' });
  }
  const product = { id: nextId++, name, price, category, stock: stock ?? 0 };
  products.push(product);
  res.status(201).json(product);
});

module.exports = router;
