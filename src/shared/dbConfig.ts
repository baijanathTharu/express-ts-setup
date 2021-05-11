import { Tweet } from 'src/modules/tweet/tweet.entity';
import { User } from 'src/modules/user/user.entity';
import { ConnectionOptions } from 'typeorm';

const dbConfig: ConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DBNAME,
  entities: [User, Tweet],
  synchronize: true,
};

export default dbConfig;
