import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { User } from 'libs/db/models/user.model';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        @InjectModel(User) private readonly userModel,
    ) { }

    async signIn(userID: string): Promise<string> {
        const user = { userid: userID };
        return this.jwtService.sign(user);
    }

    async validateUser(payload): Promise<any> {
        return await this.userModel.findById(payload.userid);
    }
}
