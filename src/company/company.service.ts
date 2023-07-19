import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
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

  async getById(id: number)
  {
    const company = await this.prismaService.company.findUnique({
      where: {
        id: id,
      },
    });
    if(company)
    {
      return company
    }
    throw new HttpException('User with this id does not exist', HttpStatus.NOT_FOUND,
    );

  }

  async fire(idEmployee: number){
    const fireUser = await this.prismaService.user.update(
      {
        where:
        {
          id: idEmployee
        },
        data:
        {
          idCompany: null,
          role: Role.User
        }
      }
    );
    fireUser.password = undefined;
    return fireUser;
  }

  async getAllEmployes(idCompany: number)
  {
    return await this.prismaService.company.findFirst(
      {
        where:
        {
          id: idCompany
        },
        select:
        {
          employee: 
          {
            select:
            {
              id: true,
              name: true,
              email: true,
              role: true
            }
          }
        }
      }
    )
  }
}
