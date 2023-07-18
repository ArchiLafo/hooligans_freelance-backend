import { Injectable } from '@nestjs/common';
import CreateEmployeeDto from './dto/create-employee.dto';
import { Role } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CompanyService {
  constructor(private readonly prismaService: PrismaService){}
  async createEmployee(employeeData: CreateEmployeeDto, id: number)
  {
    const newEmployee = await this.prismaService.user.create(
      {
        data: 
        {
          ...employeeData,
          idCompany: id,
          role: Role.Employee
        }
      }
    )
    return newEmployee;
  }
}
