import { prop, Ref } from '@typegoose/typegoose';
import { Category } from './category.model';
import { ApiModelProperty } from '@nestjs/swagger';

export class Menu {
    @ApiModelProperty({ description: 'メニュータイトル' })
    @prop()
    title: string;
    @ApiModelProperty({ description: '値段' })
    @prop()
    price: string;
    @ApiModelProperty({ description: '詳細' })
    @prop()
    summary: string;
    @ApiModelProperty({ description: 'カテゴリID' })
    @prop({ ref: Category })
    category: Ref<Category>;
    @ApiModelProperty({ description: '写真URL' })
    @prop({ default: '' })
    picture: string;
    @ApiModelProperty({ description: 'アレルギー' })
    @prop()
    allergies: string[];
}
