import { prop, Ref } from '@typegoose/typegoose';
import { Menu } from './menu.model';
import { Table } from './table.model';

export class Order {
    @prop({ ref: Table })
    table: Ref<Table>;
    @prop()
    amount: number;
    @prop()
    payment: string;
    @prop()
    status: number;　// status: 支払状態 0:支払待ち 1:支払キャンセル 2:支払完了
    @prop()
    detail: [{
        menu: Ref<Menu>,
        amount: number,
    }];
}
