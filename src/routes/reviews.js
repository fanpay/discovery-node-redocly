const express = require('express');
const router = express.Router();

const reviews = [
  { id: 1, productId: 1, userId: 2, rating: 5, comment: 'Excellent laptop, very fast.', createdAt: '2026-01-10T09:00:00Z' },
  { id: 2, productId: 2, userId: 1, rating: 4, comment: 'Good mouse, comfortable grip.', createdAt: '2026-02-14T15:30:00Z' },
];

let nextId = 3;

/**
 * @openapi
 * /reviews:
 *   get:
 *     summary: List all reviews
 *     tags: [Reviews]
 *     parameters:
 *       - in: query
 *         name: productId
 *         schema:
 *           type: integer
 *         description: Filter reviews by product
 *       - in: query
 *         name: userId
 *         schema:
 *           type: integer
 *         description: Filter reviews by user
 *     responses:
 *       200:
 *         description: A list of reviews
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 */
router.get('/', (req, res) => {
  const { productId, userId } = req.query;
  let result = reviews;
  if (productId) result = result.filter(r => r.productId === parseInt(productId));
  if (userId) result = result.filter(r => r.userId === parseInt(userId));
  res.json(result);
});

/**
 * @openapi
 * /reviews/{id}:
 *   get:
 *     summary: Get a review by ID
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Review found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       404:
 *         description: Review not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id', (req, res) => {
  const review = reviews.find(r => r.id === parseInt(req.params.id));
  if (!review) return res.status(404).json({ message: 'Review not found' });
  res.json(review);
});

/**
 * @openapi
 * /reviews:
 *   post:
 *     summary: Submit a review for a product
 *     tags: [Reviews]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ReviewInput'
 *     responses:
 *       201:
 *         description: Review submitted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/', (req, res) => {
  const { productId, userId, rating, comment } = req.body;
  if (!productId || !userId || rating === undefined) {
    return res.status(400).json({ message: 'productId, userId and rating are required' });
  }
  if (rating < 1 || rating > 5) {
    return res.status(400).json({ message: 'rating must be between 1 and 5' });
  }
  const review = {
    id: nextId++,
    productId,
    userId,
    rating,
    comment: comment ?? '',
    createdAt: new Date().toISOString(),
  };
  reviews.push(review);
  res.status(201).json(review);
});

/**
 * @openapi
 * /reviews/{id}:
 *   delete:
 *     summary: Delete a review
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Review deleted
 *       404:
 *         description: Review not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/:id', (req, res) => {
  const index = reviews.findIndex(r => r.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'Review not found' });
  reviews.splice(index, 1);
  res.status(204).send();
});

module.exports = router;
