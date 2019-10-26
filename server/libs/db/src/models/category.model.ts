import { prop } from '@typegoose/typegoose';
import { ApiModelProperty } from '@nestjs/swagger';

export class Category {
    @ApiModelProperty({ description: 'カテゴリ名' })
    @prop()
    title: string;
}
