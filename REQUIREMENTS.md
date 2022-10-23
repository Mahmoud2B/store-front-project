# APIs documentation

Please note all token required apis will need you to include the `token` value in the body as: 
```
{
    "token": ""
}
```
and you can get it from `/login` API below
Also please note Create user is not going to require a token so you can create your first demo user.

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













