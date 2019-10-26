import { Controller } from '@nestjs/common';
import { Crud } from 'nestjs-mongoose-crud';
import { ApiUseTags } from '@nestjs/swagger';
import { InjectModel } from 'nestjs-typegoose';
import { Category } from 'libs/db/models/category.model';

@Crud({ model:　Category })
@Controller('admin/categories')
@ApiUseTags('カテゴリー')
export class CategoriesController {
    constructor(@InjectModel(Category) private readonly model) { }
}
