import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import CreatePlanDto from './dto/create-plan.dto';

import { User } from '@prisma/client';
import { UpdatePlanDto } from './dto/update-plan.dto';


@Injectable()
export class PlanService {
  constructor(private readonly prismaService: PrismaService) {}
  
  // Создание записи на услугу
  async create(planData: CreatePlanDto) 
  {
    const datetime = "1"
    const newPlan = await this.prismaService.plan.create({
      data: {
        datetime: datetime,
        clientId: null
      }
    }); 
    return newPlan;
  }

  // Пользователь записывается на услугу
  async singUpPlan(idPlan: number, user: User)
  {
    const plans = await this.prismaService.plan.findUnique({
      where: {
        id: idPlan
      }
    })
    if(plans.clientId == null)
    {
      return await this.prismaService.plan.update(
        { where:
            {
                id: idPlan
            },
        data:
        {
            clientId: user.id
        }
      })
    }
    else
    {
      throw new HttpException("Такая услуга не существует", HttpStatus.NOT_FOUND)
    }
  }

  // Отмена записи на услугу
  async cancelPlan(idPlan: number) {
    return await this.prismaService.plan.update( {
      where: {
        id: idPlan
      },
      data: {
        clientId: null
      }
    })
  }

  // Обновление времени услуги
  async update(idPlan: number, updateData: UpdatePlanDto) {
    return await this.prismaService.plan.update( {
      where: {
        id: idPlan
      },
      data: updateData
    })
  }

  // Удаление плана
  async deletePlan(idPlan: number)
  {
    return await this.prismaService.plan.delete({
      where: 
      { 
        id: idPlan,
      }
    });
  }

  // Получение по id Плана
  async getById(idPlan: number)
  {
    return await this.prismaService.plan.findFirst(
      {
        where:
        {
          id: idPlan
        }
      }
    )
  }
}