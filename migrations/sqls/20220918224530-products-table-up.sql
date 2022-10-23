CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name varchar(150),
    price decimal,
    category_id int REFERENCES categories(id)
)