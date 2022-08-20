import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: process.env.DATABASE_DATABASE,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      synchronize: true,
      entities: [__dirname + '/**/*.entity{.js,.ts}'],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
