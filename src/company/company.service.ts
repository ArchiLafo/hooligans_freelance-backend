import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import CreateEmployeeDto from './dto/create-employee.dto';
import { Role } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { DataHashService } from 'src/data_hash/data_hash.service';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import * as bcrypt from 'bcrypt';
import { MailService } from 'src/mail/mail.service';
import fs from 'fs';

// const filePath = 'C:/Projects/hooligans_freelance-backend-1/src/mail/email.txt';

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

      // // удаляем через день, чтобы не втыкал
      // const delayInHours = 24;
      // const deleteTime = new Date();
      // deleteTime.setHours(deleteTime.getHours() + delayInHours);
      
      // // Устанавливаем таймер для удаления записи по указанному времени
      // setTimeout(async () => {
      //   try {
      //     await this.prismaService.user.delete({
      //       where: {
      //         id: newEmployee.id,
      //       }});
      //       console.log(`Сотрудник с id ${newEmployee.id} удален спустя ${delayInHours} часа.`);
      //     } 
      //     catch (error) {
      //       console.error('Ошибка при удалении сотрудника:', error);
      //     }
      //     deleteTime.getTime() - Date.now()});
        
      //const hash = `${await bcrypt.hash(newEmployee.id.toString(),10)}.${await bcrypt.hash(newEmployee.email, 10)}`
      const hash = `http://localhost:8081/register/employee?hash=${await this.dataHashService.encryptData(newEmployee.id.toString())}.${await this.dataHashService.encryptData(newEmployee.email)}`
      const email = newEmployee.email; // Здесь получите реальное имя пользователя из вашего приложения
      const html = `
    <!DOCTYPE html>
    <html>
    <body style="margin:0;padding:0" dir="ltr" bgcolor="#ffffff">
<table border="0" cellspacing="0" cellpadding="0" align="center" id="m_-7626415423304311386email_table" style="border-collapse:collapse">
  <tbody>
    <tr>
      <td id="m_-7626415423304311386email_content" style="font-family:Helvetica Neue,Helvetica,Lucida Grande,tahoma,verdana,arial,sans-serif;background:#ffffff">
        <table border="0" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse">
          <tbody>
            <tr>
              <td>
                <table border="0" width="430" cellspacing="0" cellpadding="0" style="border-collapse:collapse;margin:0 auto 0 auto">
                  <tbody>
                    <tr>
                      <td>
                        <table border="0" width="430px" cellspacing="0" cellpadding="0" style="border-collapse:collapse;margin:0 auto 0 auto;width:430px">
                          <tbody>
                            <tr>
                              <td width="15" style="display:block;width:15px">&nbsp;&nbsp;&nbsp;</td>
                            </tr>
                            <tr>
                              <td>
                                <table border="0" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse">
                                  <tbody>
                                    <tr>
                                      <td>
                                        <table border="0" cellspacing="0" cellpadding="0" style="border-collapse:collapse">
                                          <tbody>
                                            <tr>
                                              <td width="20" style="display:block;width:20px">&nbsp;&nbsp;&nbsp;</td>
                                              <td>
                                                <table border="0" cellspacing="0" cellpadding="0" style="border-collapse:collapse">
                                                  <tbody>
                                                    <tr>
                                                      <td>
                                                        <p style="margin:10px 0 10px 0;color:#565a5c;font-size:18px">Здравствуйте, ${email}!</p>
                                                        <p style="margin:10px 0 10px 0;color:#565a5c;font-size:18px">Вас пригласили зарегистрироваться в компании на сайте <a href="http://localhost:8081">Recordum</a>. <br>Перейдите по ссылке, чтобы зарегистрироваться в качестве сотрудника.</p>
                                                      </td>
                                                    </tr>
                                                    <tr>
                                                      <td height="20" style="line-height:20px">&nbsp;</td>
                                                    </tr>
                                                    <tr>
                                                      <td><a href="${hash}" style="color:#1b74e4;text-decoration:none;display:block;width:370px" target="_blank" data-saferedirecturl="${hash}">
                                                          <table border="0" width="390" cellspacing="0" cellpadding="0" style="border-collapse:collapse">
                                                            <tbody>
                                                              <tr>
                                                                <td style="border-collapse:collapse;border-radius:3px;text-align:center;display:block;border:solid 1px #e2ff4a;padding:10px 16px 14px 16px;margin:0 2px 0 auto;min-width:80px;background-color:#e2ff4a"><a href="${hash}" style="color:#e2ff4a;text-decoration:none;display:block" target="_blank" data-saferedirecturl="${hash}">
                                                                    <center>
                                                                      <font size="3"><span style="font-family:Helvetica Neue,Helvetica,Roboto,Arial,sans-serif;white-space:nowrap;font-weight:bold;vertical-align:middle;color:#010101;font-size:16px;line-height:16px"><span class="il">Зарегистрироваться</span></font>
                                                                    </center>
                                                                  </a></td>
                                                              </tr>
                                                            </tbody>
                                                          </table>
                                                        </a></td>
                                                    </tr>
                                                    <tr>
                                                      <td height="20" style="line-height:20px">&nbsp;</td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                            <tr>
                              <td height="10" style="line-height:10px" colspan="1">&nbsp;</td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td>
                <table border="0" cellspacing="0" cellpadding="0" style="border-collapse:collapse;margin:0 auto 0 auto;width:100%;max-width:600px">
                  <tbody>
                    <tr>
                      <td height="4" style="line-height:4px" colspan="3">&nbsp;</td>
                    </tr>
                    <tr>
                      <td width="15px" style="width:15px"></td>
                      <td width="20" style="display:block;width:20px">&nbsp;&nbsp;&nbsp;</td>
                      <td style="text-align:center">
            <div style="color:#abadae;font-size:12px;margin:0 auto 5px auto">Если вы не запрашивали это электронное письмо, <br>вы можете спокойно проигнорировать его.</div>
                        <div style="color:#abadae;font-size:11px;margin:0 auto 5px auto"><br>© 2023 HTTPS Hooligans. All rights almost reserved.</div>
                      </td>
                      <td width="20" style="display:block;width:20px">&nbsp;&nbsp;&nbsp;</td>
                      <td width="15px" style="width:15px"></td>
                    </tr>
                    <tr>
                      <td height="32" style="line-height:32px" colspan="3">&nbsp;</td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>
</body>
    </html>
    `;

      // let html: string = ''; 
      // fs.readFile(filePath, 'utf8', (err, data) => {
      //   if (err) {
      //     console.error('Ошибка чтения файла:', err);
      //     return;
      //   }
      //   html = data;
      // });

      await this.mailService.sendMail(newEmployee.email, 'Регистрация в компании', html);
      return hash;
    }
    else {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN)
    }
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
      throw new HttpException("Этот пользователь уже зарегистрирован", HttpStatus.BAD_REQUEST)
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
    return user;
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
