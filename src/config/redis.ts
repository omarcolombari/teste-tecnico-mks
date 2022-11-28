import { CacheModuleOptions } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';

const configService = new ConfigService();

const cacheModuleOptions: CacheModuleOptions =
  configService.get('NODE_ENV') === 'production'
    ? {
        isGlobal: true,
        store: redisStore as any,
        host: configService.get('REDIS_URL'),
      }
    : {
        isGlobal: true,
        store: redisStore as any,
        host: configService.get('REDIS_HOST'),
        port: '6379',
      };

export default cacheModuleOptions;
