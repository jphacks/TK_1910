import { Controller, Post, Body, HttpException } from '@nestjs/common';
import { ApiUseTags, ApiModelProperty } from '@nestjs/swagger';
import { User } from 'libs/db/models/user.model';
import { InjectModel } from 'nestjs-typegoose';
import { AuthService } from './auth.service';

class UserLoginDto {
    @ApiModelProperty({ description: 'ユーザ名', example: 'username' })
    username: string;
    @ApiModelProperty({ description: 'パスワード', example: 'password' })
    password: string;
}

@Controller('admin/auth')
@ApiUseTags('認証')
export class AuthController {
    constructor(
        @InjectModel(User) private readonly userModel,
        private readonly authService: AuthService,
    ) { }
    @Post('login')
    async Auth(@Body() userLoginDto: UserLoginDto) {
        const user = await this.userModel.findOne({ username: userLoginDto.username }).select('+password');
        if (!user) { throw new HttpException('ユーザが見つかりませんでした', 401); }
        const isValid = await require('bcrypt').compareSync(userLoginDto.password, user.password);
        if (!isValid) { throw new HttpException('パスワードが正しくありません', 401); }
        const accessToken = await this.authService.signIn(user._id);
        return {
            data: {
                access_token: accessToken,
            },
            message: 'ログイン完了',
        };
    }
}
