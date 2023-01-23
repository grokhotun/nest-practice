import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/users.model';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  private async validateUser(dto: CreateUserDto) {
    const user = await this.userService.getByEmail(dto.email);
    const isEqual = await bcrypt.compare(dto.password, user.password);

    if (!user || !isEqual) {
      throw new UnauthorizedException({
        message: 'Email or password is incorrect',
      });
    }

    return user;
  }

  async login(dto: CreateUserDto) {
    const user = await this.validateUser(dto);
    return this.generateToken(user);
  }

  private async generateToken(user: User) {
    const payload = { email: user.email, id: user.id, roles: user.roles };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  async signup(dto: CreateUserDto) {
    const candidate = await this.userService.getByEmail(dto.email);

    if (candidate) {
      throw new HttpException('User exists', HttpStatus.BAD_REQUEST);
    }

    const passwordHash = await bcrypt.hash(dto.password, 5);

    const user = await this.userService.create({
      ...dto,
      password: passwordHash,
    });

    return this.generateToken(user);
  }
}
