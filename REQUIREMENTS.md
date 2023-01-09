# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index - (/products)
- Show - (/products/:id)
- Create [token required] - (/products)
- [OPTIONAL] Top 5 most popular products - (/products/topfive)
- [OPTIONAL] Products by category (args: product category) - (/product/category/:category)

#### Users
- Index [token required] - (/users)
- Show [token required] - (/users/:id)
- Create N[token required] - (/users)

#### Orders
- Current Order by user (args: user id)[token required] - (/order/current)
- [OPTIONAL] Completed Orders by user (args: user id)[token required] - (/order/completed)
- Add products to order by user(args: quantity, product id, order id, user id)[token required] - (/order/:id/products)

#### DashboardQueries
- Get All Products in Orders - (/products_in_orders)

## Data Shapes
#### Product
-  id
- name
- price
- [OPTIONAL] category
- SCHEMA - (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price INTEGER NOT NULL,
    category VARCHAR(255)
)

#### User
- id
- firstName
- lastName
- password
- SCHEMA - (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(256) NOT NULL,
    lastname VARCHAR(256) NOT NULL,
    password TEXT NOT NULL
)
#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)
- SCHEMA - (
    id SERIAL PRIMARY KEY,
    product_Id INTEGER REFERENCES products(id),
    quantity INTEGER NOT NULL,
    user_id INTEGER REFERENCES users(id),
    status VARCHAR(255) DEFAULT 'active'
)

#### Order_Products
- id
- quantity
- product_id
- order_id
- SCHEMA - (
    id SERIAL PRIMARY KEY,
    quantity INTEGER,
    order_id INTEGER REFERENCES orders (id),
    product_id INTEGER REFERENCES products(id)
)
