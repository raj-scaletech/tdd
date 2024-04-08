import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UserService {
    constructor(
        private readonly jwtService: JwtService,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) { }
    async register(createUserDto: CreateUserDto): Promise<User> {
        try {
            const { password, username, email } = createUserDto
            const newuser = this.userRepository.create({ password, username, email })
            return this.userRepository.save(newuser)
        } catch (error) {
            throw new BadRequestException('user cannot register')
        }
    }

    async login(loginUserDto: LoginUserDto) {
        try {
            const { email, password } = loginUserDto;
            const payload = { email: email }
            const user = await this.userRepository.findOne({ where: payload });
            if (!user) {
                throw new NotFoundException('User not found');
            }
            if (user.password !== password) {
                throw new BadRequestException('Invalid password');
            }
            const token = await this.jwtService.signAsync(payload, { secret: 'secret' });
            return { token: token };
        } catch (error) {
            console.log(error);
            throw new BadRequestException('User cannot login');
        }
    }

    async profile(email: string) {
        try {
            const user = await this.userRepository.findOne({ where: { email: email } })
            if(!user){
                throw new BadRequestException('User not found');
            }
            return user
        } catch (error) {
            throw new BadRequestException('profile not found');
        }
    }
}
