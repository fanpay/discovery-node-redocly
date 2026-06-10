# Discovery Node + Redocly

A sample Node.js REST API with four resources (products, orders, users, reviews) and automatic OpenAPI spec export for Redocly.

## Requirements

- Node.js 18+
- npm 9+
- (Optional) [Redocly CLI](https://redocly.com/docs/cli/) for linting and previewing docs

## Install

```bash
npm install
```

## Run locally

```bash
npm run dev       # development mode with hot-reload (nodemon)
npm start         # production mode
```

Server starts at **http://localhost:3000**

## Available endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/health` | Health check |
| GET | `/products` | List products (optional `?category=`) |
| GET | `/products/:id` | Get product by ID |
| POST | `/products` | Create a product |
| GET | `/orders` | List orders (optional `?status=`) |
| GET | `/orders/:id` | Get order by ID |
| POST | `/orders` | Place an order |
| GET | `/users` | List users |
| GET | `/users/:id` | Get user by ID |
| POST | `/users` | Create a user |
| GET | `/reviews` | List reviews (optional `?productId=` / `?userId=`) |
| GET | `/reviews/:id` | Get review by ID |
| POST | `/reviews` | Submit a review |
| DELETE | `/reviews/:id` | Delete a review |

### Quick smoke test with curl

```bash
# Health check
curl http://localhost:3000/health

# List all products
curl http://localhost:3000/products

# Filter by category
curl "http://localhost:3000/products?category=electronics"

# Get a single product
curl http://localhost:3000/products/1

# Create a product
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Keyboard","price":79.99,"category":"electronics","stock":50}'

# List orders filtered by status
curl "http://localhost:3000/orders?status=pending"

# Place an order
curl -X POST http://localhost:3000/orders \
  -H "Content-Type: application/json" \
  -d '{"customerId":1,"items":[{"productId":2,"qty":2,"unitPrice":29.99}]}'

# Create a user
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Carlos López","email":"carlos@example.com"}'

# List reviews for a product
curl "http://localhost:3000/reviews?productId=1"

# Submit a review
curl -X POST http://localhost:3000/reviews \
  -H "Content-Type: application/json" \
  -d '{"productId":1,"userId":2,"rating":5,"comment":"Excellent!"}'

# Delete a review
curl -X DELETE http://localhost:3000/reviews/1
```

## Export OpenAPI spec

```bash
npm run export:openapi
```

Generates two files:
- `openapi/openapi.json`
- `openapi/openapi.yaml`

> `openapi/` is git-ignored — run this command whenever you need a fresh spec.

## Use with Redocly

### Install Redocly CLI

```bash
npm install -g @redocly/cli
```

### Lint the spec

```bash
redocly lint openapi/openapi.yaml
```

### Preview the docs locally

```bash
redocly preview-docs openapi/openapi.yaml
```

Opens an interactive documentation portal at **http://localhost:8080**

### Bundle into a single file

```bash
redocly bundle openapi/openapi.yaml -o openapi/openapi.bundled.yaml
```

The `redocly.yaml` at the project root registers the spec under the alias `discovery-store@v1`, so you can also run these commands using that alias:

```bash
redocly lint discovery-store@v1
redocly preview-docs discovery-store@v1
```

## Project structure

```
src/
  app.js            # Express app and route wiring
  openapi.js        # swagger-jsdoc config + shared schemas
  routes/
    products.js     # /products endpoints + OpenAPI annotations
    orders.js       # /orders endpoints + OpenAPI annotations
    users.js        # /users endpoints + OpenAPI annotations
scripts/
  export-openapi.js # Exports spec to openapi/ as JSON and YAML
redocly.yaml        # Redocly project config
```
