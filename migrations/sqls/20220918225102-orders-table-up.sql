CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    status varchar(20),
    user_id int REFERENCES users(id)
)