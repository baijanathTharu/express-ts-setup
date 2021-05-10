import './pre-start'; // Must be the first import
import 'reflect-metadata';
import app from '@server';
import logger from '@shared/Logger';
import { createConnection } from 'typeorm';
import dbConfig from '@shared/dbConfig';

/************************************************************************************
 *                              Set database connection
 ***********************************************************************************/

createConnection(dbConfig)
  .then((connection) => {
    // Start the server
    const port = Number(process.env.PORT || 3000);
    app.listen(port, () => {
      logger.info('connected to db');
      logger.info('Express server started on port: ' + port);
    });
  })
  .catch((error) => {
    logger.err('Unable to connect to db', error);
    process.exit(1);
  });
