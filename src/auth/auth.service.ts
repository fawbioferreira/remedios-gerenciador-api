import { Injectable } from '@nestjs/common';
import { Users } from 'src/users/entities/users.entity';
import { UsersService } from 'src/users/users.service';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(username);
        if (user) {
            const passwordMatch = await this.comparePassword(user, pass);

            if (passwordMatch) {
                const { password, ...result } = user;
                return result;
            }
        }
        return null;
    }

    async comparePassword(user: Users, pass: string) {
        const match = await bcrypt.compare(pass, user.password);

        if (match)
            return true;
        else
            return false;
    }

    async login(user: any) {
        const user_data: any = await this.usersService.findOne(user.email);
        const { password, ...data } = user_data;

        data.access_token = this.jwtService.sign(data);

        return data;
    }

}
