import { Controller, Get, Param, HttpException, Post, Body } from '@nestjs/common';
import { ApiUseTags, ApiModelProperty, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { InjectModel } from 'nestjs-typegoose';
import { User } from 'libs/db/models/user.model';
import { Menu } from 'libs/db/models/menu.model';
import { mongoose } from '@typegoose/typegoose';
import { Table } from 'libs/db/models/table.model';
import { Category } from 'libs/db/models/category.model';
import { allergies } from 'libs/db/models/allergies';
import { Order } from 'libs/db/models/order.model';
import async from 'async';

class CreateOrderDto {
    amount: number;
    detail: [{
        menu: string;
        amount: number;
    }];
}


@Controller('server/order')
@ApiUseTags('注文(クライアント)')
@ApiBearerAuth()
export class OrderController {
    public shopName = process.env.RESTRANT_NAME;
    constructor(
        @InjectModel(Menu) private readonly menuModel,
        @InjectModel(Table) private readonly tableModel,
        @InjectModel(Category) private readonly categoryModel,
        @InjectModel(Order) private readonly orderModel,
    ) { }

    @Get(':id')
    async MenuList(@Param('id') id: string) {
        if (!mongoose.Types.ObjectId.isValid(id)) { throw new HttpException('正しいIDを指定してください', 401); }
        const table = await this.tableModel.findById(id);
        if (!table) { throw new HttpException('テーブルが見つかりませんでした', 403); }
        const menu = await this.menuModel.find();
        if (!menu) { throw new HttpException('メニューがありません', 403); }
        const category = await this.categoryModel.aggregate().project({ name: '$_id', label: '$title' }).exec();
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

    @Post(':id')
    @ApiOperation({ title: '選択したメニューを注文する' })
    async confirm(@Param('id') tableId: string, @Body() createOrderDto: CreateOrderDto) {
        if (createOrderDto.detail.length < 1) { throw new HttpException('注文内容を確認してください', 405); }
        const menuList = await this.menuModel.find();
        const order = await this.orderModel.create({
            table: tableId,
            amount: createOrderDto.amount,
            payment: 'cash',
            status: 0,
            detail: createOrderDto.detail,
        });
        return order;
    }

    @Get('detail/:id')
    @ApiOperation({ title: '注文情報を読みとる' })
    async detail(@Param('id') orderID: string) {
        const order = await this.orderModel.findById(orderID).populate({
            path: 'detail.menu',
            model: 'Menu',
        });
        if (!order) { throw new HttpException('注文が見つかりませんでした', 405); }
        return order;
    }

    @Get('payment/:id')
    @ApiOperation({ title: '注文情報を読みとる' })
    async payment(@Param('id') orderID: string) {
        const order = await this.orderModel.findById(orderID).populate({
            path: 'detail.menu',
            model: 'Menu',
        });
        if (!order) { throw new HttpException('注文が見つかりませんでした', 405); }
        return order;
    }
}
