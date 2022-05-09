import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UserRepository } from '../user/repository/user.repository';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private userRepository: UserRepository) {
    super();
  }
  serializeUser(user: any, done: (err: Error, user: any) => void): any {
    done(null, { id: user.id });
  }
  async deserializeUser(
    payload: any,
    done: (err: Error, user: any) => void,
  ): Promise<any> {
    const { password, ...user } = await this.userRepository.findOne(payload.id);
    done(null, user);
  }
}
