import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RegistrationDTO } from './interfaces/RegistrationDTO';
import { AuthRepository } from './repository/auth.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserJwtPayload } from './interfaces/UserJwtPayload';

@Injectable()
export class AuthService {
  constructor(
    private authRepository: AuthRepository,
    private jwtService: JwtService,
  ) {}

  async registration(registrationDTO: RegistrationDTO) {
    return await this.authRepository.registration(registrationDTO);
  }

  async login(user) {
    const { password, ...userResponse } = await this.authRepository.login(
      user.email,
    );
    const isValid = await bcrypt.compare(user.password, password);
    if (isValid) {
      const payload: UserJwtPayload = {
        email: userResponse.email,
        sub: userResponse.id,
        role: userResponse.role,
      };
      return { access_token: this.jwtService.sign(payload) };
    } else {
      throw new UnauthorizedException('Incorrect login credentials!');
    }
  }
}
