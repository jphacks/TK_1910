import { Controller, UseGuards } from '@nestjs/common';
import { Crud } from 'nestjs-mongoose-crud';
import { ApiUseTags } from '@nestjs/swagger';
import { InjectModel } from 'nestjs-typegoose';
import { Category } from 'libs/db/models/category.model';
import { AuthGuard } from '@nestjs/passport';

@Crud({ model:　Category })
@Controller('admin/categories')
@ApiUseTags('カテゴリー')
@UseGuards(AuthGuard())
export class CategoriesController {
    constructor(@InjectModel(Category) private readonly model) { }
}
