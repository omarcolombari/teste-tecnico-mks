import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { UsersModule } from './users/users.module';
import { MoviesModule } from './movies/movies.module';
import dataSource from 'src/db/data-source';
import cacheModuleOptions from './config/redis';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({ ...dataSource.options, autoLoadEntities: true }),
    CacheModule.register(cacheModuleOptions),
    UsersModule,
    AuthModule,
    MoviesModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
