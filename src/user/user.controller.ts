import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ProfileDto } from './dto/profile.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }
    @Post('register')
    async register(@Body() createUserDto: CreateUserDto) {
        const user = await this.userService.register(createUserDto)
        return { id: user.id, username: user.username }
    }

    @Post('login')
    async login(@Body() loginDto: LoginUserDto) {
        const token = await this.userService.login(loginDto)
        return token
    }

    @Get('profile')
    async getProfile(@Body() profileDto: ProfileDto) {
        const user = await this.userService.profile(profileDto.email)
        return { id: user.id, email: user.email, username: user.username }
    }
}
