import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards , ParseIntPipe} from '@nestjs/common';
import { CompanyService } from './company.service';
import CreateEmployeeDto from './dto/create-employee.dto';
import JwtAuthenticationGuard from 'src/guard/jwt-authentication.guard';
import { User } from '@prisma/client';


@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @UseGuards(JwtAuthenticationGuard)
  @Post('create_employee/:id')
  async createEmployee(@Body() employeeData: CreateEmployeeDto, user: User, @Param('id', ParseIntPipe) id: number)
  {
    console.log(employeeData)
    return await this.companyService.createEmployee(employeeData, id);
  }
}
