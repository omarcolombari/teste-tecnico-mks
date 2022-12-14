import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import 'dotenv/config';

const configService = new ConfigService();

export const dataSourceOptions: DataSourceOptions =
  configService.get('NODE_ENV') === 'production'
    ? {
        type: 'postgres',
        url: configService.get('POSTGRES_URL'),
        synchronize: false,
        logging: true,
        ssl: {
          rejectUnauthorized: false,
          ca: fs.readFileSync(configService.get('SSL_CA_CERTIFICATES')),
        },
        entities: [__dirname + '/**/*.entity{.js,.ts}'],
        migrations: [__dirname + '/**/migrations/*{.js,.ts}'],
      }
    : {
        type: 'postgres',
        host: configService.get('IS_COMPOSE') ? 'db' : 'localhost',
        port: 5432,
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        synchronize: false,
        logging: true,
        ssl: false,
        entities: [__dirname + '/**/*.entity{.js,.ts}'],
        migrations: [__dirname + '/**/migrations/*{.js,.ts}'],
      };

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
