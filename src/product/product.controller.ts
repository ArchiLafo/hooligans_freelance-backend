import { Controller, Post, Patch, Body, Get, Param, Req, Delete, UseGuards} from '@nestjs/common';
import { ProductService } from './product.service';
import CreateProductDto from './dto/create-product.dto';
import { ParseIntPipe } from '@nestjs/common/pipes';
import UpdateProductDto from './dto/update-product.dto';
import JwtAuthenticationGuard from 'src/guard/jwt-authentication.guard';
import RequestWithUser from 'src/authentication/requestWithUser.interface';
import AuthorGuard from 'src/guard/author.guard';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Plan } from '@prisma/client';
import { MailService } from 'src/mail/mail.service';
import fs from 'fs';

// const filePath = 'C:/Projects/hooligans_freelance-backend-1/src/mail/email.txt';
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
                                                        <p style="margin:10px 0 10px 0;color:#565a5c;font-size:18px">Здравствуйте, 	!</p>
                                                        <p style="margin:10px 0 10px 0;color:#565a5c;font-size:18px">Вас пригласили зарегистрироваться в компании на сайте <a href="http://localhost:8081">Recordum</a>. <br>Перейдите по ссылке, чтобы зарегистрироваться в качестве сотрудника.</p>
                                                      </td>
                                                    </tr>
                                                    <tr>
                                                      <td height="20" style="line-height:20px">&nbsp;</td>
                                                    </tr>
                                                    <tr>
                                                      <td><a href="{{link}}" style="color:#1b74e4;text-decoration:none;display:block;width:370px" target="_blank" data-saferedirecturl="{{link}}">
                                                          <table border="0" width="390" cellspacing="0" cellpadding="0" style="border-collapse:collapse">
                                                            <tbody>
                                                              <tr>
                                                                <td style="border-collapse:collapse;border-radius:3px;text-align:center;display:block;border:solid 1px #e2ff4a;padding:10px 16px 14px 16px;margin:0 2px 0 auto;min-width:80px;background-color:#e2ff4a"><a href="{{link}}" style="color:#e2ff4a;text-decoration:none;display:block" target="_blank" data-saferedirecturl="{{link}}">
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

@ApiTags('Products')
@Controller('products')
export class ProductController 
{
  constructor(private readonly productService: ProductService, private readonly mailService: MailService) {}

  // тест электронной почты
  @Post('mail/test')
  async sendEmail() {
    const link = 'http://localhost:8081/';
    const name = 'Kirill'; // Здесь получите реальное имя пользователя из вашего приложения

    // let html: string = '';
    // fs.readFile(filePath, 'utf8', (err, data) => {
    //   if (err) {
    //     console.error('Ошибка чтения файла:', err);
    //     return;
    //   }
    //   html = data;
    // });
    
    await this.mailService.sendMail('slimeboy871@gmail.com', 'Тест', html);
  }

  @Get()
  @ApiOperation({ summary: "Получить все услуги" })
  @ApiResponse({
    description: 'Список всех созданных услуг',
    type: Array<CreateProductDto>
  })
  async getAllProducts() 
  {
    return await this.productService.getAllProducts()
  }

  @Get(':id')
  @ApiOperation({ summary: "Получить услугу" })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Должен быть ID услуги, которая существует в базе данных',
    type: Number
  })
  @ApiResponse({ description: 'Услуга', })
  async getOneProducts(@Param('id', ParseIntPipe) id: number)
   {
    return await this.productService.getOneProduct(id);
  }

  @UseGuards(JwtAuthenticationGuard, AuthorGuard)
  @Patch('update/:id')
  @ApiOperation({ summary: "Изменить услугу" })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Должен быть ID услуги, которая существует в базе данных',
    type: Number
  })
  @ApiBody({ type: UpdateProductDto })
  @ApiResponse({
    description: 'Обновленная услуга',
    type: UpdateProductDto
  })
  async updateProduct(@Param('id', ParseIntPipe) id: number, @Body() updateProductDto: UpdateProductDto, @Req() request: RequestWithUser)
  {
    console.log(id)
    const user = request.user;
    return this.productService.updateProduct(updateProductDto, user, id);
  }

  @UseGuards(JwtAuthenticationGuard, AuthorGuard)
  @Delete('delete/:id')
  @ApiOperation({ summary: "Удалить услугу" })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Должен быть ID услуги, которая существует в базе данных',
     type: Number
  })
  @ApiResponse({ description: 'Услуга удалена', })
  async deleteProduct(@Req() request: RequestWithUser, @Param('id', ParseIntPipe) id: number)
  {
     const user = request.user; 
     return this.productService.deleteProduct(id, user);
  }

  @Get('plans/:id')
  @ApiOperation({ summary: "Получить все доступные записи на услугу" })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Должен быть ID услуги, которая существует в базе данных',
    type: Number
  })
  @ApiResponse({ description: 'Все доступные записи', })
  async getAllPlansProductForUser(@Param('id', ParseIntPipe) id: number)
  {
    return await this.productService.getAllPlansProductForUsers(id);
  }
  
  @UseGuards(JwtAuthenticationGuard, AuthorGuard)
  @Get('plans/information/:id')
  @ApiOperation({ summary: "Получение заполненных записей для владельца услуги или админа" })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Должен быть ID услуги, которая существует в базе данных',
    type: Number
  })
  @ApiResponse({
    description: 'Список занятых записей',
    type: Array<Plan>,
  })
  async getAllPlansProductForAdmin(@Req() request: RequestWithUser, @Param('id', ParseIntPipe) id: number)
  {
    return await this.productService.getAllPlansProductForAdmin(id);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post('add')
  @ApiOperation({ summary: "Создание новой услуги" })
  @ApiBody({ type: CreateProductDto, })
  @ApiResponse({
    description: 'Созданная услуга',
    type: CreateProductDto,
  })
  async create(@Body() CreateProductData: CreateProductDto, @Req() request: RequestWithUser) 
  {
    const user = request.user; 
    return this.productService.create(CreateProductData,user);
  } 
}
