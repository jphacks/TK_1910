import { prop, pre } from '@typegoose/typegoose';
import { ApiModelProperty } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';

@pre<User>('save', async function(next) {
    if (this.isModified('password') || this.isNew) {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(this.password, salt, null);
        this.password = hash;
    }
    return next();
})

export class User {
    @ApiModelProperty({ description: 'アカウント名' })
    @prop({ required: true })
    username: string;
    @ApiModelProperty({ description: 'パスワード' })
    @prop({
        select: false, required: true,
    })
    password: string;
}
