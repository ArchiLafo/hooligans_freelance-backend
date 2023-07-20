import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import CreateUserDto from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ProductService } from 'src/product/product.service';
import SetAvatarDto from './dto/set-avatar.dto';
import { Role, User } from '@prisma/client';
import { PlanService } from 'src/plan/plan.service';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService, private readonly productService: ProductService) {}

  // Создане юзеров
  async create(userData: CreateUserDto, isCompany: Boolean) {
    let userRole: Role = Role.User
    if (isCompany)
    {
      userRole = Role.Leader
    }
    let newUser = await this.prismaService.user.create(
      {
        data: 
        {
          ...userData,
          role: userRole
        }
      }
    );
    console.log(newUser)
    if (isCompany)
    {
      const company = await this.prismaService.company.create(
        {
          data: {
            name: newUser.name,
            leaderId: newUser.id,
          }
        }
      );
      newUser = await this.prismaService.user.update(
        {
          where:
          {
            id: newUser.id
          },
          data:
          {
            idCompany: company.id
          }
        }
      )
    }
    return newUser;
  }

  // Обновление юзера
  async updateProfile(updateData: UpdateUserDto, user: User) {
    if (user.name == updateData.name) {
      throw new HttpException('У вас уже это имя', HttpStatus.BAD_REQUEST)
    }
    user = await this.prismaService.user.update({
      where: {
        id: user.id
      },
      data: updateData
    });
    user.password = undefined;
    return user;
  }

  // Обновление аватара юзера
  async updateAvatar(setAvatarDto: SetAvatarDto, user: User) {
    user = await this.prismaService.user.update({
      where: { 
        id: user.id,
      }, 
      data: { 
        avatar: setAvatarDto.avatar,
      }});
    user.password = undefined;
    return user;
  }

  // Поиск всех юзеров
  async findAll() {
    return await this.prismaService.user.findMany();
  }

  // Получение юзреров по id
  async getByEmail(email: string) {
    console.log("geter: " + email)
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      }
    });
    if (user) {
      return user;
    }
    throw new HttpException('Неправильный адрес электронной почты', HttpStatus.NOT_FOUND, );
  }
  

  // Получение услуг юзера
  async getProductsByUserId(id: number) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: id,
      },
    });  
    return await this.productService.getProductsByUser(user)
  }

  // Получение услуг, на которые записан юзер
  async getMyPlans(user: User) {
    const plans = await this.prismaService.plan.findMany( {
      select: {
        id: true,
        clientId: true,
        datetime: true,
        product: true,
      },
      where: {
        clientId: user.id
      },
    })
    
    const currentDate = new Date();
    plans.forEach(async element => {
        if (element.datetime < currentDate) {
            const deletePlan = await this.prismaService.plan.delete({where: {id: element.id}})
            console.log("Удалена запись на время" + deletePlan)
        }
    });

    const check = await this.prismaService.plan.findMany({
        where: {
        clientId: user.id
    }});

    // проверить
    console.log(check);
    return await plans;
  } 

  // все клиенты
  async getAllUsedPlans(user: User) { 
    const busyPlans = await this.prismaService.product.findMany({where: {
      authorId: user.id,
    },
    select: {
      productPlan: {
        where:
        {
          clientId: {
            not: null
          },
        },
        select: {
          id: true,
          idProduct: true,
          datetime: true,
          client: {
            select: { 
              name: true,
              avatar: true,
            }}
          }}
        }
      })
  return busyPlans[0].productPlan;
  }

  // Получение юзера по id
  async getInformation(id: number) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: id,
      },
      include: {
        company: true,
      }
    });
    user.password = undefined;
    return user;
  }

  // Получение юзера по id
  async getById(id: number) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: id,
      },
    });
    console.log("Получили по id юзера: " + user.email);
    if (user) {
      user.password = undefined;
      return user;
    }
    throw new HttpException('Пользователь с таким идентификатором не существует', HttpStatus.NOT_FOUND,
    );
  }
}