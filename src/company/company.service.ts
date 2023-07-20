import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import CreateEmployeeDto from './dto/create-employee.dto';
import { Role } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { DataHashService } from 'src/data_hash/data_hash.service';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import * as bcrypt from 'bcrypt';
import { MailService } from 'src/mail/mail.service';


@Injectable()
export class CompanyService {
  constructor(private readonly prismaService: PrismaService, private readonly dataHashService: DataHashService, private readonly mailService: MailService, ){}
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
      const hash = `http://localhost:8081/register/${await this.dataHashService.encryptData(newEmployee.id.toString())}.${await this.dataHashService.encryptData(newEmployee.email)}`
      await this.mailService.sendMail(newEmployee.email, 'Регистрация в компании', ('Ссылка для регистрации: \n' + hash));
      return hash;
    }
    else
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN)
  }

  // для этого гвард (чекни условие)
  async registerEmployee(userData: UpdateEmployeeDto)
  {
    const split_hash: string[] = userData.hash.split('.')
    const idUser: number = Number(await this.dataHashService.decryptData(split_hash[0]))
    const emailUser: string = await this.dataHashService.decryptData(split_hash[1])
    console.log(userData)
    console.log("1" + idUser)
    delete userData.hash;
    const oldUser = await this.prismaService.user.findUnique(
      {
        where:
        {
          id: idUser
        }
      }
    )
    if (oldUser.name)
    {
      throw new HttpException("Этот пользователь уже зарегестрирован", HttpStatus.FORBIDDEN)
    }
    const user = await this.prismaService.user.update(
    {
      where:
      {
        id: idUser,
      },
      data:
      {
        ...userData,
        password: await bcrypt.hash(userData.password, 10)
      },
      select:
      {
        id: true,
        name: true,
        email: true,
        company: true
      }
    })
    return user
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
  
  // для этого гвард (чекни условие)
  async DataForRegisterEmployee(hash: string)
  {
    const split_hash: string[] = hash.split('.')
    const idUser: number = Number(await this.dataHashService.decryptData(split_hash[0]))
    const emailUser: string = await this.dataHashService.decryptData(split_hash[1])
    console.log('email:' + emailUser)
    console.log('idUser:' + idUser)
    if ((!idUser) || (!emailUser))
    {
      throw new HttpException("Ошибка запроса", HttpStatus.BAD_REQUEST)
    }
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
        company: true
      }
    })
    if ((!user.name) && ( user.email == emailUser ))
    {
      delete user.name
      return user
    }
    else
    {
      throw new HttpException("Ошибка запроса", HttpStatus.BAD_REQUEST)
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
              role: true,
              avatar: true
            }
          }
        }
      }
    )
  }
}
