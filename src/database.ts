import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const {
    POSTGRES_HOST,
    POSTGRES_DATABASE,
    POSTGRES_USER,
    POSTGRES_DATABASE_TEST,
    POSTGRES_PASSWORD,
    ENV,
    DB_PORT
} = process.env;
const client = new Pool({
    host: POSTGRES_HOST,
    database: ENV === 'dev' ? POSTGRES_DATABASE : POSTGRES_DATABASE_TEST,
    user: POSTGRES_USER,
    port: parseInt(DB_PORT as string),
    password: POSTGRES_PASSWORD
});

export default client;
