import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Property_Value } from './model/property_value.model';
import { PropertyValueController } from './property_value.controller';
import { PropertyValueService } from './property_value.service';

@Module({
  imports: [SequelizeModule.forFeature([Property_Value])],
  controllers: [PropertyValueController],
  providers: [PropertyValueService],
})
export class PropertyValueModule {}
