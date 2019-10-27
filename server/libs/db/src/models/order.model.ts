import { prop, Ref } from '@typegoose/typegoose';
import { Menu } from './menu.model';
import { Table } from './table.model';
import { ApiModelProperty } from '@nestjs/swagger';
import { Schema } from 'mongoose';

export class Order {
    @ApiModelProperty({ description: 'テーブルID' })
    @prop({ ref: Table })
    table: Ref<Table>;
    @ApiModelProperty({ description: '合計金額' })
    @prop()
    amount: number;
    @ApiModelProperty({ description: '支払い方法' })
    @prop()
    payment: string;
    @ApiModelProperty({ description: '注文状態' })
    @prop()
    status: number;　// status: 支払状態 0:支払待ち 1:支払キャンセル 2:支払完了
    @prop({ default: false })
    done: boolean;　// done: true: 渡し完了 false: 渡し待ち
    @prop()
    @ApiModelProperty({ description: '注文詳細' })
    detail: [{
        menu: Ref<Menu>,
        amount: number,
    }];
}
