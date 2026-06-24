const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Discovery Store API',
      version: '2.0.0',
      description: 'A sample REST API exposing products, orders, and users resources.',
      contact: {
        name: 'API Support',
        email: 'support@example.com',
      },
    },
    servers: [
      { url: 'http://localhost:3000', description: 'Local development' },
    ],
    components: {
      schemas: {
        Product: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            name: { type: 'string', example: 'Laptop Pro' },
            price: { type: 'number', format: 'float', example: 1299.99 },
            category: { type: 'string', example: 'electronics' },
            stock: { type: 'integer', example: 45 },
          },
        },
        ProductInput: {
          type: 'object',
          required: ['name', 'price', 'category'],
          properties: {
            name: { type: 'string', example: 'Keyboard' },
            price: { type: 'number', format: 'float', example: 79.99 },
            category: { type: 'string', example: 'electronics' },
            stock: { type: 'integer', example: 100 },
          },
        },
        Order: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            customerId: { type: 'integer', example: 42 },
            items: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  productId: { type: 'integer', example: 1 },
                  qty: { type: 'integer', example: 2 },
                  unitPrice: { type: 'number', format: 'float', example: 29.99 },
                },
              },
            },
            status: {
              type: 'string',
              enum: ['pending', 'shipped', 'delivered', 'cancelled'],
              example: 'pending',
            },
            total: { type: 'number', format: 'float', example: 59.98 },
          },
        },
        OrderInput: {
          type: 'object',
          required: ['customerId', 'items'],
          properties: {
            customerId: { type: 'integer', example: 42 },
            items: {
              type: 'array',
              items: {
                type: 'object',
                required: ['productId', 'qty'],
                properties: {
                  productId: { type: 'integer', example: 1 },
                  qty: { type: 'integer', example: 2 },
                  unitPrice: { type: 'number', format: 'float', example: 29.99 },
                },
              },
            },
          },
        },
        User: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            name: { type: 'string', example: 'Alice Martin' },
            email: { type: 'string', format: 'email', example: 'alice@example.com' },
            role: { type: 'string', enum: ['admin', 'customer'], example: 'customer' },
          },
        },
        UserInput: {
          type: 'object',
          required: ['name', 'email'],
          properties: {
            name: { type: 'string', example: 'Carlos López' },
            email: { type: 'string', format: 'email', example: 'carlos@example.com' },
            role: { type: 'string', enum: ['admin', 'customer'], example: 'customer' },
          },
        },
        Review: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            productId: { type: 'integer', example: 1 },
            userId: { type: 'integer', example: 2 },
            rating: { type: 'integer', minimum: 1, maximum: 5, example: 4 },
            comment: { type: 'string', example: 'Great product!' },
            createdAt: { type: 'string', format: 'date-time', example: '2026-01-10T09:00:00Z' },
          },
        },
        ReviewInput: {
          type: 'object',
          required: ['productId', 'userId', 'rating'],
          properties: {
            productId: { type: 'integer', example: 1 },
            userId: { type: 'integer', example: 2 },
            rating: { type: 'integer', minimum: 1, maximum: 5, example: 4 },
            comment: { type: 'string', example: 'Great product!' },
          },
        },
        Error: {
          type: 'object',
          properties: {
            message: { type: 'string', example: 'Resource not found' },
          },
        },
      },
    },
  },
  apis: ['./src/app.js', './src/routes/*.js'],
  // routes are scanned in alphabetical order; swagger-jsdoc merges all @openapi blocks
};

module.exports = swaggerJsdoc(options);
