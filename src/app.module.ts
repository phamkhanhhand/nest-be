import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PostgreSqlDriver, defineConfig } from '@mikro-orm/postgresql';
import { BudgetsModule } from './budgets/budgets.module';
import { FlexvalueModule } from './flexvalue/flexvalue.module';
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
            host: config.get('DB_HOST', 'localhost'),
            port: Number(config.get('DB_PORT', 5431)),
            user: config.get('DB_USER', 'pkha'),
            password: config.get('DB_PASS', 'pkha'),
            dbName: config.get('DB_NAME', 'flexvalue'),
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