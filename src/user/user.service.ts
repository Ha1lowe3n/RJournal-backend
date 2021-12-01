import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
    ) {}

    async create(createUserDto: CreateUserDto) {
        const { userByEmail, userByFullName } =
            await this.checkEmailAndFullName(createUserDto);

        if (userByFullName || userByEmail) {
            throw new HttpException(
                'Username are taken',
                HttpStatus.UNPROCESSABLE_ENTITY,
            );
        }

        const newUser = new UserEntity();
        Object.assign(newUser, createUserDto);

        return await this.userRepository.save(newUser);
    }

    async findAll() {
        return await this.userRepository.find();
    }

    findOne(id: number) {
        return `This action returns a #${id} user`;
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        return `This action updates a #${id} user`;
    }

    remove(id: number) {
        return `This action removes a #${id} user`;
    }

    async checkEmailAndFullName(dto: CreateUserDto) {
        const userByEmail = await this.userRepository.findOne({
            email: dto.email,
        });
        const userByFullName = await this.userRepository.findOne({
            fullName: dto.fullName,
        });

        return {
            userByEmail,
            userByFullName,
        };
    }
}
