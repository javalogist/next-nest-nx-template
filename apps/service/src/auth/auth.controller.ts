import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  BaseController,
  LoginDto,
  Public,
  RegisterDto,
  Role,
  Roles
} from '@shared/server';
import { ApiResponse } from '@shared/common';

@Controller('auth')
export class AuthController extends BaseController {
  constructor(private readonly authService: AuthService) {
    super();
  }

  @Public()
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    await this.authService.register(
      registerDto.name,
      registerDto.email,
      registerDto.password,
      registerDto.roles
    );
    return ApiResponse.success(null, 'User registered successfully.');
  }

  @Public()
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const token = await this.authService.login(
      loginDto.email,
      loginDto.password
    );
    return ApiResponse.success(token);
  }

  @Roles(Role.ADMIN)
  @Get('admin')
  getAdminData(@Request() req: any) {
    return ApiResponse.success(
      `Hello Admin, Your name is  ${req.user.name}`,
      'Route accessed'
    );
  }

  @Roles(Role.SUPERADMIN)
  @Get('super-admin')
  getSuperAdminData(@Request() req: any) {
    return ApiResponse.success(
      `Hello SuperAdmin, Your name is  ${req.user.name}`,
      'Route accessed'
    );
  }
}
