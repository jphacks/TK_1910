import { Module } from '@nestjs/common';
import { TablesController } from './tables.controller';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [TablesController],
})
export class TablesModule {}
