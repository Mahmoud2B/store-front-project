# Storefront Backend Project

## Database setup

#### Create User

```
CREATE USER postgres WITH PASSWORD '123321Mm';
```

#### Create the Database
```
CREATE DATABASE storefront db;
CREATE DATABASE storefront_test_db;
```
#### Grant all database privileges to user in both databases**
```
GRANI ALL PRIVILEGES ON DATABASE store_front TO postgres;
GRANT ALL PRIVILEGES ON DATABASE store_front_test IO postgres;
```

**Database Port**: 5432

**Server Port** : 3000

## Project setup instructions
The .env content needed to connect to the database:
```
POSTGRES_HOST=localhost
POSTGRES_DATABASE=store_front
POSTGRES_DATABASE_TEST=store_front_test
POSTGRES_USER=postgres
POSTGRES_PASSWORD=123321Mm
ENV=dev
DB_PORT=5432
SERVER_PORT=3000
BCRYPT_PASSWORD=say-hi-and-enter
SALT_ROUNDS=10
TOKEN_SECRET=alohamora221
```


- Run `npm install`
- Run `db-migrate db:create store_front && db-migrate db:create store_front_test` to create the databases
- Run `db-migrate up` to migrate the tables
- if you are using Windows OS replace `export ENV=test &&` at the start of `test` script on 'package.json' file with `set ENV=test&&`
- Run `npm run test` to run the created tests