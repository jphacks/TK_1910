import { Controller, Get, Param, HttpException } from '@nestjs/common';
import { ApiUseTags, ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { InjectModel } from 'nestjs-typegoose';
import { User } from 'libs/db/models/user.model';
import { Menu } from 'libs/db/models/menu.model';
import { mongoose } from '@typegoose/typegoose';
import { Table } from 'libs/db/models/table.model';
import { Category } from 'libs/db/models/category.model';

class CreateOrderDto {
    detail: [OrderDetail];
}

class OrderDetail {
    @ApiModelProperty({ description: 'メニューID' })
    @IsNotEmpty({ message: 'メニューIDを入力してください' })
    menu: string;
    @ApiModelProperty({ description: 'メニュー数量' })
    @IsNotEmpty({ message: '数量を入力してください' })
    amount: number;
}

@Controller('server/order')
@ApiUseTags('注文(クライアント)')
export class OrderController {
    public shopName = process.env.RESTRANT_NAME;
    constructor(
        @InjectModel(Menu) private readonly menuModel,
        @InjectModel(Table) private readonly tableModel,
        @InjectModel(Category) private readonly categoryModel,
    ) { }

    @Get(':id')
    async MenuList(@Param('id') id: string) {
        if (!mongoose.Types.ObjectId.isValid(id)) { throw new HttpException('正しいIDを指定してください', 401); }
        const table = await this.tableModel.findById(id);
        if (!table) { throw new HttpException('テーブルが見つかりませんでした', 403); }
        const menu = await this.menuModel.find();
        if (!menu) { throw new HttpException('メニューがありません', 403); }
        const category = await this.categoryModel.aggregate().project({ name: '$_id', label: '$title' }).exec();
        const allergies = [
            {
                title: '卵',
                value: 'egg',
            },
            {
                title: '牛乳',
                value: 'milk',
            },
            {
                title: '小麦',
                value: 'wheat',
            },
            {
                title: 'そば',
                value: 'soba',
            },
            {
                title: '落花生',
                value: 'peanuts',
            },
            {
                title: 'えび',
                value: 'shrimp',
            },
            {
                title: 'かに',
                value: 'crab',
            },
            {
                title: '鶏肉',
                value: 'chicken',
            },
            {
                title: '牛肉',
                value: 'beef',
            },
            {
                title: '豚肉',
                value: 'pork',
            },
        ];
        return {
            data: {
                restrant_name: this.shopName,
                table_no: table.table,
                categories: category,
                menu: menu,
                allergies: allergies,
            },
        };
    }
}
