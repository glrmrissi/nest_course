import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto';
import { UpdatePutUserDTO } from './dto/update-put-user.dto';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {

    }
    async create({email, name, password}: CreateUserDTO) {

        return await this.prisma.users.create({
            data: {
                email,
                name,
                password,
            },
        });
    }

    async show() {
        return await this.prisma.users.findMany({
            where: {
              
            }
        });
    }

    async showOne(id: number) {
        this.exists(id);
        return await this.prisma.users.findUnique({
            where: {
                id,
            }
        })
    }

    async update(id: number, {email, name, password, birthAt}: UpdatePutUserDTO) {
        this.exists(id);

        return this.prisma.users.update({
            data: {
                email,
                name,
                password,
                birthAt: birthAt ? new Date(birthAt) : null
            },
            where: {
                id
            }
        })
    }

    async updatePartial(id: number,  {email, name, password, birthAt}: UpdatePatchUserDTO) {
        this.exists(id);

        const data: any = {};
        
        if(birthAt) {
            data.birthAt = new Date(birthAt);
        }

        if(email) {
            data.email = email;
        }

        if(name) {
            data.name = name;
        }

        if(password) {
            data.password = password;
        }
        return this.prisma.users.update({
            data,
            where: {
                id
            }
        })
    }

    async delete(id: number) {
        this.exists(id);

        return await this.prisma.users.delete({
            where: {
                id
            }
        })
    }

    async exists(id: number) {
         if(!(await this.prisma.users.count({
            where: {
                id
            }
         }))) {
            throw new NotFoundException(`O ${id} não foi achado`);
        }
    }
}
