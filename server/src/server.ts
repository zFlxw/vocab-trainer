import 'reflect-metadata';
import application from './application';
import * as http from 'http';
import { createConnection } from 'typeorm';

createConnection().then((_) => {
  const PORT = process.env.PORT || 3001;
  const server = http.createServer(application.instance);

  server.listen(PORT, () => {
    console.log(`Backend started! Listening on port: ${PORT}`);
  });
});
