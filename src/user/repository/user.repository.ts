import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/db/models/user.model';
import { ModelClass } from 'objection';

@Injectable()
export class UserRepository {
  constructor(@Inject(User.token) private userModel: ModelClass<User>) {}

  async findAll() {
    return await this.userModel.query();
  }

  async findOne(id) {
    const user = await this.userModel.query().where({ id: id }).first();
    return user;
  }
}
