import { Controller } from '@nestjs/common';
import { Crud } from 'nestjs-mongoose-crud';
import { ApiUseTags } from '@nestjs/swagger';
import { Table } from 'libs/db/models/table.model';
import { InjectModel } from 'nestjs-typegoose';

@Crud({ model: Table })
@Controller('tables')
@ApiUseTags('テーブル')
export class TablesController {
    constructor(@InjectModel(Table) private readonly model) { }
}
