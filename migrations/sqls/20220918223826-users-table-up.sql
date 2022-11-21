CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username varchar(100),
    first_name varchar(100),
    last_name varchar(100),
    password varchar
);

INSERT INTO users(username,first_name,last_name,password) VALUES ('testUser','test','user','123321');