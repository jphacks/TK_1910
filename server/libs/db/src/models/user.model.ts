import { prop } from '@typegoose/typegoose';
import { ApiModelProperty } from '@nestjs/swagger';

export class User {
    @ApiModelProperty({ description: 'アカウント名' })
    @prop()
    username: string;
    @ApiModelProperty({ description: 'パスワード' })
    @prop()
    password: string;
}
