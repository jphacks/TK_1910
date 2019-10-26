import { Controller, UseGuards } from '@nestjs/common';
import { Crud } from 'nestjs-mongoose-crud';
import { ApiUseTags } from '@nestjs/swagger';
import { Table } from 'libs/db/models/table.model';
import { InjectModel } from 'nestjs-typegoose';
import { AuthGuard } from '@nestjs/passport';

@Crud({ model: Table })
@Controller('admin/tables')
@ApiUseTags('テーブル')
@UseGuards(AuthGuard())
export class TablesController {
    constructor(@InjectModel(Table) private readonly model) { }
}
