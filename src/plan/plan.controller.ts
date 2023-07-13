import { Controller, Post, Patch, Body, Get, Param, Req, UseGuards, Delete, ParseIntPipe} from '@nestjs/common';
import JwtAuthenticationGuard from 'src/guard/jwt-authentication.guard';
import RequestWithUser from 'src/authentication/requestWithUser.interface';
import { PlanService } from './plan.service';
import CreatePlanDto from './dto/create-plan.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import PlanGuard from 'src/guard/plan.guard';
import ClientGuard from 'src/guard/client.guard';


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

    //Юзер записывается на услугу
    @UseGuards(JwtAuthenticationGuard)
    @Patch('singup/:id')
    @ApiOperation({ summary: "Записаться на услугу" })
    @ApiParam({
        name: 'id',
        required: true,
        description: 'Должен быть ID записи, который существует в базе данных',
        type: Number
      })
    @ApiResponse({ description: 'Запись на услугу', })
    async singUpPlan(@Body() plan, @Req() request: RequestWithUser)
    {
        return await this.planService.singUpPlan(plan.idPlan, request.user)
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
    async update(@Body() plan, @Req() request: RequestWithUser, @Param('id', ParseIntPipe) id: number)
    {
        return await this.planService.update(id, plan.dayTime)
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
 
