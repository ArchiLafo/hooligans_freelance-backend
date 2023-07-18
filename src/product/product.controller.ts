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

@ApiTags('Products')
@Controller('products')
export class ProductController 
{
  constructor(private readonly productService: ProductService) {}
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
