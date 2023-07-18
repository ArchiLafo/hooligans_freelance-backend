import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import CreateUserDto from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ProductService } from 'src/product/product.service';
import SetAvatarDto from './dto/set-avatar.dto';
import { Role, User } from '@prisma/client';

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
    const newUser = await this.prismaService.user.create(
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
      await this.prismaService.company.create(
        {
          data: {
            leaderId: newUser.id,
          }
        }
      )
    }
    return newUser;
  }

  // Обновление юзера
  async updateProfile(updateData: UpdateUserDto, user: User) {
    if (user.name == updateData.name) {
      throw new HttpException('You already have this name', HttpStatus.BAD_REQUEST)
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
      },
    });
    if (user) {
      return user;
    }
    throw new HttpException('Wrong email', HttpStatus.NOT_FOUND, );
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
    
    // бля, это хуйня ебучая, гварды не нужны для одного условия
    // plans.forEach(element => {
    //   if (element.datetime > Date.now()) {
    //     await this.prismaService.plan.delete(element)
    //   }
    // });
    return plans;
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
    throw new HttpException('User wit*h this id does not exist', HttpStatus.NOT_FOUND,
    );
  }
}