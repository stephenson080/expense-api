import {
  Controller,
  Param,
  Patch,
  Get,
  Body,
  Delete,
  Put,
  ParseUUIDPipe,
  BadRequestException,
  UseGuards,
  Request,
  NotAcceptableException,
  HttpCode
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserService } from 'src/user/user.service';
import { ReportService } from './report.service';
import { AddReportDTO, UpdateReportDTO } from './reportDTO';
import { Type } from './types';

@Controller('api/reports')
@UseGuards(JwtAuthGuard)
export class ReportController {
  constructor(
    private readonly reportService: ReportService,
    private readonly userService: UserService,
  ) {}
  @Get(':type')
  async getReports(@Param('type') type: Type) {
    if (type !== Type.ALL && type !== Type.EXPENSE && type !== Type.INCOME) {
      throw new BadRequestException(
        {
          message: `report type should be one of ${Type.ALL}, ${Type.EXPENSE}, ${Type.INCOME}`,
        },
        'Bad Request',
      );
    }
    const reports = await this.reportService.getReports(type);
    return reports;
  }
  @Get('User/:type')
  async getUsersReports(@Request() req, @Param('type') type: Type) {
    if (type !== Type.ALL && type !== Type.EXPENSE && type !== Type.INCOME) {
      throw new BadRequestException(
        {
          message: `report type should be one of ${Type.ALL}, ${Type.EXPENSE}, ${Type.INCOME}`,
        },
        'Bad Request',
      );
    }
    const user = await this.userService.getUser(req.user.userId);
    return user.reports;
  }
  @Get('Get/:id')
  async getReport(@Param('id', ParseUUIDPipe) id: string) {
    return await this.reportService.getReportById(id);
  }
  @Patch('Update/:id')
  async updateReport(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatedReport: UpdateReportDTO,
  ) {
      return await this.reportService.updateReport(id, updatedReport)
  }

  @HttpCode(201)
  @Put()
  async addReport(@Request() req, @Body() report: AddReportDTO) {
    if (report.type !== Type.EXPENSE && report.type !== Type.INCOME) {
      throw new BadRequestException(
        {
          message: `report type should be one of ${Type.EXPENSE}, ${Type.INCOME}`,
        },
        'Bad Request',
      );
    }
    const user = await this.userService.findOne(req.user.username);

    const newReport = await this.reportService.addReport(report, user);
    return newReport;
  }
  @Delete('Delete/:id')
  async deleteReport(@Param('id', ParseUUIDPipe) id: string) {
    return await this.reportService.deleteReport(id);
  }
}
