import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {ReportEntity} from './entities/report.entity';
import { User } from './entities/user.entity';
import { ReportModule } from './report/report.module';
import { UserModule } from './user/user.module';



@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ReportModule,
    UserModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [ReportEntity, User],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),    
  ],
  controllers: [],
  providers: []
})
export class AppModule {
}
