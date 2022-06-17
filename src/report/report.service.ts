import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReportEntity } from '../entities/report.entity';
import { User } from '../entities/user.entity';
import { AddReportDTO } from './reportDTO';
import { Type } from './types';

@Injectable()
export class ReportService {

  constructor(
    @InjectRepository(ReportEntity)
    private readonly reportRepo: Repository<ReportEntity>,
  ) {}
  addReport(report: AddReportDTO, user: User) {
    const newReport = this.reportRepo.create({
      ...report,
      user: user
    });
    return this.reportRepo.save(newReport);
  }
  getUserReports(user: User) {
    return this.reportRepo.find({
      where: {
        user
      },
    });
  }
  getReports(type: Type) {
    if (type === Type.ALL) {
      return this.reportRepo.find();
    }
    return this.reportRepo.find({
      where: {
        type: type,
      },
    });
  }
  getReportById(id: string) {
    return this.reportRepo.findOne({ where: { report_id: id } });
  }

  async updateReport(report_id: string, updatedReport: AddReportDTO) {
    try {
      await this.reportRepo.update(
        { report_id: report_id },
        { ...updatedReport, updated_at: new Date() },
      );
      return 'Report Updated';
    } catch (error) {
      return error.message;
    }
  }
  async deleteReport(reportId: string) {
    try {
      await this.reportRepo.delete({ report_id: reportId });
      return 'Report Deleted';
    } catch (error) {
      return error.message;
    }
  }
}
