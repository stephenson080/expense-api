import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm'
import { ReportController } from './report.controller';
import {ReportEntity} from '../entities/report.entity';
import { ReportService } from './report.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/entities/user.entity';
import { UserService } from 'src/user/user.service';


@Module({
  imports: [TypeOrmModule.forFeature([ReportEntity, User])],
  controllers: [ReportController],
  providers: [ReportService, JwtAuthGuard, UserService],
})
export class ReportModule {}
