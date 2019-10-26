import { prop, Ref } from '@typegoose/typegoose';

export class Table {
    @prop()
    table: string;
}
