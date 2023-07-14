import { Controller, Post, Patch, Body, Get, Param, Req, UseGuards, Delete, ParseIntPipe} from '@nestjs/common';
import JwtAuthenticationGuard from 'src/guard/jwt-authentication.guard';
import RequestWithUser from 'src/authentication/requestWithUser.interface';
import { PlanService } from './plan.service';
import CreatePlanDto from './dto/create-plan.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import PlanGuard from 'src/guard/plan.guard';
import ClientGuard from 'src/guard/client.guard';
import { UpdatePlanDto } from './dto/update-plan.dto';


@ApiTags('Plan')
@Controller('plan')
export class PlanController 
{
    constructor(private readonly planService: PlanService) {}
    // Создание записи для услуги
    @UseGuards(JwtAuthenticationGuard)
    @Post('create')
    @ApiOperation({ summary: "Создать запись на услугу" })
    @ApiBody({ type: CreatePlanDto })
    @ApiResponse({ description: 'Запись на услугу', })
    async creat(@Body() planData, @Req() request: RequestWithUser)
    {
        return await this.planService.create(planData)
    }
    
    // Получение записи по id
    @Get('findOne/:id')
    @ApiOperation({ summary: "Получить запись по id" })
    @ApiResponse({ description: 'Одна запись', })
    async getById(@Param('id', ParseIntPipe) id: number)
    {
      return await this.planService.getById(id)
    }
    
    //Юзер записывается на услугу
    @UseGuards(JwtAuthenticationGuard)
    @Patch('signup/:id')
    @ApiOperation({ summary: "Записаться на услугу" })
    @ApiParam({
        name: 'id',
        required: true,
        description: 'Должен быть ID записи, который существует в базе данных',
        type: Number
      })
    @ApiResponse({ description: 'Запись на услугу', })
    async singUpPlan(@Param('id', ParseIntPipe) id: number, @Req() request: RequestWithUser)
    {
        return await this.planService.singUpPlan(id, request.user)
    }

    // Обновление имение услуги
    @UseGuards(JwtAuthenticationGuard, PlanGuard)
    @Patch('update/:id')
    @ApiOperation({ summary: "Изменить запись на услугу" })
    @ApiParam({
        name: 'id',
        required: true,
        description: 'Должен быть ID записи, который существует в базе данных',
        type: Number
      })
    @ApiResponse({ description: 'Обновлненная запись', })
    async update(@Body() updatePlan: UpdatePlanDto, @Req() request: RequestWithUser, @Param('id', ParseIntPipe) id: number)
    {
        return await this.planService.update(id, updatePlan)
    }

    //Отмена записи услуги
    @UseGuards(JwtAuthenticationGuard, ClientGuard)
    @Patch('cancel/:id')
    @ApiOperation({ summary: "Отменить запись на услугу" })
    @ApiParam({
        name: 'id',
        required: true,
        description: 'Должен быть ID записи, который существует в базе данных',
        type: Number
      })
    @ApiResponse({ description: 'Запись отменена', })
    async cancelPlan(@Param('id', ParseIntPipe) id: number, @Req() request: RequestWithUser)
    {
        return await this.planService.cancelPlan(id)
    }

    //Удаление услуги
    @UseGuards(JwtAuthenticationGuard, PlanGuard)
    @Delete('delete/:id')
    @ApiOperation({ summary: "Удалить запись на услугу" })
    @ApiParam({
        name: 'id',
        required: true,
        description: 'Должен быть ID записи, который существует в базе данных',
        type: Number
      })
    @ApiResponse({ description: 'Удаление записи на услугу', })
    async delete(@Param('id', ParseIntPipe) id: number, @Req() request: RequestWithUser) {
        console.log(id)
        return await this.planService.deletePlan(id)
    }

}
 
