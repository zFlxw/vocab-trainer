import 'reflect-metadata';
import application from './application';
import * as http from 'http';
import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';

dotenv.config();

export const dataSource = new DataSource({
  type: 'postgres',
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 5432,
  synchronize: true,
  logging: false,
  entities: [__dirname + '/entity/**/*.ts'],
});

dataSource
  .initialize()
  .then(() => console.log('Established connection to database.'))
  .catch(() => console.error('Failed to initialize database connection.'));

const PORT = process.env.PORT || 3001;
const server = http.createServer(application.instance);

server.listen(PORT, () => {
  console.log(`Backend started! Listening on port: ${PORT}`);
});
