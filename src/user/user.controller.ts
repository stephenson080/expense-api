import { Body, Controller, Get, Post, Put, Request, UseGuards} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { User } from 'src/entities/user.entity';
import { UserService } from './user.service';
import { CreateUserDTO } from './userDTO';

@Controller('api/users')
export class UserController {
  constructor(private readonly authService: AuthService, private readonly userService: UserService) {}
  
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async loginUser(@Request() req : {user: User}) {
    return await this.authService.loginWithCredentials(req.user)
  }

  @Put('register')
  async createUser(@Body() user: CreateUserDTO){
    return this.userService.createUser(user)
  }
  
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    return await this.userService.getUser(req.user.userId)
  }
}
