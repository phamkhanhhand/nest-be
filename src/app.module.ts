import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PostgreSqlDriver, defineConfig } from '@mikro-orm/postgresql';
import { BudgetsModule } from './budgets/budgets.module';
import { FlexvalueModule } from './flexvalue/flex-value.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    BudgetsModule,
    FlexvalueModule, 
    
      ConfigModule.forRoot({
        isGlobal: true,
        // nếu bạn dùng .env.dev thì thêm dòng dưới
        // envFilePath: '.env.dev',
      }),

      BudgetsModule,
      FlexvalueModule,


      MikroOrmModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (config: ConfigService) =>
          defineConfig({
            type: 'postgresql',
            // driver: PostgreSqlDriver,
            host: config.get('DB_HOST',  process.env.DB_HOST || 'localhost'),
            port: Number(config.get('DB_PORT', process.env.DB_PORT || 5431)),
            user: config.get('DB_USER', process.env.DB_USER || 'postgres'),
            password: config.get('DB_PASS', process.env.DB_PASS || 'postgres'),
            dbName: config.get('DB_NAME', process.env.DB_NAME || 'postgres'),
            // entities: ['./dist/entities'], // Adjust the path as needed
            // autoLoadEntities: true,

            entities: [__dirname + '/**/*.entity.js'],
            entitiesTs: [__dirname + '/**/*.entity.ts'],

          }),
      }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }