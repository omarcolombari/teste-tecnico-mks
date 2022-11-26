import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import 'dotenv/config';

const configService = new ConfigService();

const host = configService.get('IS_COMPOSE') ? 'db' : 'localhost';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host,
  port: 5432,
  username: configService.get('POSTGRES_USER'),
  password: configService.get('POSTGRES_PASSWORD'),
  database: configService.get('POSTGRES_DB'),
  synchronize: false,
  logging: true,
  ssl:
    process.env.NODE_ENV === 'production'
      ? { rejectUnauthorized: false }
      : false,
  entities: [__dirname + '/**/*.entity{.js,.ts}'],
  migrations: [__dirname + '/**/migrations/*{.js,.ts}'],
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
