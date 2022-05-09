import { Comments } from 'src/db/models/comments.model';
import { News } from 'src/db/models/news.model';
import { Role } from 'src/db/models/role.model';
import { Status } from 'src/db/models/status.model';
import { User } from 'src/db/models/user.model';

export const MODELS = [User, Role, News, Status, Comments];
export const jwtConstants = {
  secret: 'secretKey',
};
export const ROLES_KEY = 'roles';
