import { prop } from '@typegoose/typegoose';
import { ApiModelProperty } from '@nestjs/swagger';

export class Table {
    @ApiModelProperty({ description: 'テーブル名' })
    @prop()
    table: string;
}
