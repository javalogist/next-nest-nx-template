import {
  Body,
  Controller,
  Get,
  Post,
  Request
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Roles } from './decorator/roles.decorator';
import { Role } from '../user/schemas/user.schema';
import { Public } from './decorator/public.decorator';
import { SuccessResponse } from '../utils/dto/api.response.dto';
import { BaseController } from '../utils/base.controller';

@Controller('auth')
export class AuthController extends  BaseController{
  constructor(private readonly authService: AuthService) {
    super();
  }

  @Public()
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    await this.authService.register(registerDto.name, registerDto.email, registerDto.password, registerDto.roles);
    return new SuccessResponse(null, 'User registered successfully.');
  }

  @Public()
  @Post('login')
  async login(@Body() loginDto: LoginDto) {

    const token = await this.authService.login(loginDto.email, loginDto.password);
    return new SuccessResponse(token);
  }

  @Roles(Role.ADMIN)
  @Get('admin')
  getAdminData(@Request() req: any) {
    return new SuccessResponse(`Hello Admin, Your name is  ${req.user.name}`, 'Route accessed');
  }

  @Roles(Role.SUPERADMIN)
  @Get('super-admin')
  getSuperAdminData(@Request() req: any) {
    return new SuccessResponse(`Hello SuperAdmin, Your name is  ${req.user.name}`, 'Route accessed');
  }
}
