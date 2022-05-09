import { Inject, Injectable } from '@nestjs/common';
import { ModelClass } from 'objection';
import { User } from 'src/db/models/user.model';
import { RegistrationDTO } from '../interfaces/RegistrationDTO';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/db/models/role.model';

@Injectable()
export class AuthRepository {
  constructor(
    @Inject(User.token) private userModel: ModelClass<User>,
    @Inject(Role.token) private roleModel: ModelClass<Role>,
  ) {}

  async registration(registrationDTO: RegistrationDTO) {
    const { name, email, password, role = 'Default' } = registrationDTO;

    // if statement can be added for differnt roles
    const defaultRole = await this.roleModel
      .query()
      .select('id')
      .where({ role: role })
      .first();
    const hash = await bcrypt.hash(password, 10);
    return await this.userModel.query().insert({
      name: name,
      email: email,
      password: hash,
      role_id: defaultRole.id,
    });
  }

  async login(email) {
    const user = await this.userModel
      .query()
      .select('user.id', 'user.email', 'user.password', 'role.role')
      .leftJoin('role', 'user.role_id', 'role.id')
      .where({ email: email })
      .first();
    return user;
  }
}
