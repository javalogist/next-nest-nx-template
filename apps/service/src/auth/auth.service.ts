import {
  Injectable
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument, Role } from '../user/schemas/user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { ServiceException } from '../utils/exception/service.exception';
import { comparePassword } from '../utils/bcrypt.util';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService
  ) {
  }

  async register(name: string, email: string, password: string, roles: Role[] = [Role.USER]) {
    const existingUser = await this.userModel.findOne({ email }).exec();
    if (existingUser) {
      throw new ServiceException('Email already exists');
    }
    const user = new this.userModel({
      name,
      email,
      password,
      roles
    });

    await user.save();
  }

  async login(email: string, password: string) {
    const user = await this.userModel.findOne({ email });

    if (!user) throw new ServiceException('Invalid email address');

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid)
      throw new ServiceException('Invalid credentials');

    const payload = { userId: user._id, email: user.email, roles: user.roles };
    return this.jwtService.sign(payload);
  }
}
