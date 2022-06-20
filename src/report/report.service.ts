import { BadRequestException, UnprocessableEntityException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReportEntity } from '../entities/report.entity';
import { User } from '../entities/user.entity';
import { AddReportDTO, ReponseReportDTO, UpdateReportDTO } from './reportDTO';
import { Type } from './types';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(ReportEntity)
    private readonly reportRepo: Repository<ReportEntity>,
  ) {}
  async addReport(report: AddReportDTO, user: User) {
    try {
      const newReport = this.reportRepo.create({
        ...report,
        user: user,
      });
      const savedReport = await this.reportRepo.save(newReport);
      return new ReponseReportDTO(savedReport)
    } catch (error) {
      throw new UnprocessableEntityException({message: error.message})
    }
    
  }
  async getUserReports(user: User) {
    const reports = await this.reportRepo.find({
      where: {
        user,
      },
    });
    return reports.map(report => new ReponseReportDTO(report))
  }
  async getReports(type: Type) {
    if (type === Type.ALL) {
      return (await this.reportRepo.find()).map(report => new ReponseReportDTO(report))
    }
    return (await this.reportRepo.find({
      where: {
        type: type,
      },
    })).map(report => new ReponseReportDTO(report))
  }
  async getReportById(id: string) {
    const report = await this.reportRepo.findOneBy({ report_id: id });
    return new ReponseReportDTO(report)
  }

  async updateReport(report_id: string, updatedReport: UpdateReportDTO) {
    try {
      if (
        updatedReport.type &&
        updatedReport.type !== Type.EXPENSE &&
        updatedReport.type !== Type.INCOME
      ) {
        throw new BadRequestException(
          {
            message: `report type should be one of ${Type.EXPENSE}, ${Type.INCOME}`,
          },
          'Bad Request',
        );
      }
      await this.reportRepo.update(
        { report_id: report_id },
        { ...updatedReport, updated_at: new Date() },
      );
  
      return 'Report Updated!';
    } catch (error) {
      throw new UnprocessableEntityException({message: error.message})
    }
    
  }
  async deleteReport(reportId: string) {
    await this.reportRepo.delete({ report_id: reportId });
    return 'Report Deleted';
  }
}
