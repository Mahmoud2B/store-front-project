# APIs documentation

Please note all token required apis will need you to include the `token` value in the body as: 
```
{
    "token": ""
}
```
and you can get it from `/login` API below
Also please note Create user is not going to require a token so you can create your first demo user.

## Database schema

**Tables**: users, categories, products, orders, and orders_products.

#### users

```
                                      Table "public.users"
   Column   |          Type          | Collation | Nullable |              Default              
------------+------------------------+-----------+----------+-----------------------------------
 id         | integer                |           | not null | nextval('users_id_seq'::regclass)
 username   | character varying(100) |           |          | 
 first_name | character varying(100) |           |          | 
 last_name  | character varying(100) |           |          | 
 password   | character varying      |           |          | 
Indexes:
    "users_pkey" PRIMARY KEY, btree (id)
Referenced by:
    TABLE "orders" CONSTRAINT "orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id)
```

#### categories

```
                                   Table "public.categories"
 Column |         Type          | Collation | Nullable |                Default                 
--------+-----------------------+-----------+----------+----------------------------------------
 id     | integer               |           | not null | nextval('categories_id_seq'::regclass)
 name   | character varying(50) |           |          | 
Indexes:
    "categories_pkey" PRIMARY KEY, btree (id)
Referenced by:
    TABLE "products" CONSTRAINT "products_category_id_fkey" FOREIGN KEY (category_id) REFERENCES categories(id)
```

#### products

```
                                      Table "public.products"
   Column    |          Type          | Collation | Nullable |               Default                
-------------+------------------------+-----------+----------+--------------------------------------
 id          | integer                |           | not null | nextval('products_id_seq'::regclass)
 name        | character varying(150) |           |          | 
 price       | numeric                |           |          | 
 category_id | integer                |           |          | 
Indexes:
    "products_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:
    "products_category_id_fkey" FOREIGN KEY (category_id) REFERENCES categories(id)
Referenced by:
    TABLE "orders_products" CONSTRAINT "orders_products_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(id)
```

#### orders

```
                                    Table "public.orders"
 Column  |         Type          | Collation | Nullable |              Default               
---------+-----------------------+-----------+----------+------------------------------------
 id      | integer               |           | not null | nextval('orders_id_seq'::regclass)
 status  | character varying(20) |           |          | 
 user_id | integer               |           |          | 
Indexes:
    "orders_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:
    "orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id)
Referenced by:
    TABLE "orders_products" CONSTRAINT "orders_products_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(id)
```

#### orders-products

```
                              Table "public.orders_products"
   Column   |  Type   | Collation | Nullable |                   Default                   
------------+---------+-----------+----------+---------------------------------------------
 id         | integer |           | not null | nextval('orders_products_id_seq'::regclass)
 quantity   | integer |           |          | 
 product_id | integer |           |          | 
 order_id   | integer |           |          | 
Indexes:
    "orders_products_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:
    "orders_products_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(id)
    "orders_products_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(id)
```

### Products
- Index -> [get] localhost:3000/products
- Show -> [get] localhost:3000/products/:id
- Create [token required] -> [post] localhost:3000/products/create
```
{
    "name": "",
    "price": 1,
    "category_id": 1,
    "token": ""
}
```
### Users
- Index [token required] -> [get] localhost:3000/users
- Show [token required] -> [get] localhost:3000/users/1
- Create N[token required] -> [post] localhost:3000/users/create
```
{
    "first_name": "",
    "last_name":"",
    "username": "",
    "password": ""
}
```
- authinticate -> [post] localhost:3000/login
```
{
    "username": "",
    "password": ""
}
```

### Orders
- Current Order by user (args: user id)[token required] -> [post] localhost:3000/orders/get_user_current_order
```
{
    "userID":1,
    "token":""
}
```
- Get all orders [token required] -> [get] localhost:3000/orders
- Add product to Order [token required] -> [post] localhost:3000/orders/add_product
```
    {
    "quantity":4,
    "orderId":1,
    "productId":4
}
```
- Create order (please note to create order you need to close the active one) [token required] -> [post] localhost:3000/orders/create
```
{
    "userID": 1,
    "token":""
}
```
- Close order (change status to closed) [token required]-> [post] localhost:3000/orders/close_order
```
{
    "orderID": 4,
    "token":""
}
```
### Category
- Create category [token required] -> [post] localhost:3000/categories/create
```
{
    "name": "Mobile Phones"
}
```
- Get all categories [token required] -> [get] localhost:3000/categories
- Get category by id [token required] -> [get] localhost:3000/categories/:id













