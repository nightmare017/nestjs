import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { RegistrationDTO } from './interfaces/RegistrationDTO';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Roles } from './decorators/role.decorator';
import { Role } from './enums/roles.enum';
import { RoleGuard } from './guards/role.guard';
import { LoginDTO } from './interfaces/LoginDTO';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.Admin)
  @Post('/registration')
  async registration(@Body() registrationDTO: RegistrationDTO) {
    return await this.authService.registration(registrationDTO);
  }

  @Post('/login')
  async login(@Body() loginDTO: LoginDTO) {
    return await this.authService.login(loginDTO);
  }
}
