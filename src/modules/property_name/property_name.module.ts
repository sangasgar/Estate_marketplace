import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Property_Name } from './model/property_name.model';
import { PropertyNameController } from './property_name.controller';
import { PropertyNameService } from './property_name.service';

@Module({
  imports: [SequelizeModule.forFeature([Property_Name])],
  controllers: [PropertyNameController],
  providers: [PropertyNameService],
})
export class PropertyNameModule {}
