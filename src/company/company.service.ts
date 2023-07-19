import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import CreateEmployeeDto from './dto/create-employee.dto';
import { Role } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { DataHashService } from 'src/data_hash/data_hash.service';





@Injectable()
export class CompanyService {
  constructor(private readonly prismaService: PrismaService, private readonly dataHashService: DataHashService){}
  async createEmployee(employeeData: CreateEmployeeDto, id: number)
  {
    const oldEmployee = await this.prismaService.user.findUnique(
      {
        where:
        {
          email: employeeData.email
        }
      }
    )
    if(!oldEmployee)
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
      //const hash = `${await bcrypt.hash(newEmployee.id.toString(),10)}.${await bcrypt.hash(newEmployee.email, 10)}`
      const hash = `${await this.dataHashService.encryptData(newEmployee.id.toString())}.${await this.dataHashService.encryptData(newEmployee.email)}`
      // console.log('Hash: ' + hash)
      return hash;
    }
    else
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN)
  }

  async getInfoEmployee(hash: string)
  {
    const hash_split: string[] = hash.split('.')
    const idUser: number = Number(await this.dataHashService.decryptData(hash[0]))
    const email: string = await this.dataHashService.decryptData(hash[1])
    const user = await this.prismaService.user.findUnique(
      {
        where:
        {
          id: idUser
        }
      }
    );
    //user.password = undefined;
    if (!user.name)
    {
      return user;
    }
    else
    {
      throw new HttpException("Не найден такой работник", HttpStatus.NOT_FOUND)
    }
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

  async DataForRegisterEmployee(hash: string)
  {
    const split_hash: string[] = hash.split('.')
    const idUser: number = Number(await this.dataHashService.decryptData(split_hash[0]))
    const emailUser: string = await this.dataHashService.decryptData(split_hash[1])
    console.log(idUser)
    const user = await this.prismaService.user.findUnique(
      {
        where:
        {
          id: idUser
        },
        select:
        {
          id: true,
          name: true,
          email: true,
          idCompany: true
        }
      })
    if (!user.name)
    {
      return user
    }
    else
    {
      throw new HttpException("Данный пользователь уже активирован", HttpStatus.FORBIDDEN)
    }
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
    return await this.prismaService.company.findUnique(
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
