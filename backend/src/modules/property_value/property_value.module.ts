import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SeederModule } from 'nestjs-sequelize-seeder';
import { Property_Value } from './model/property_value.model';
import { PropertyValueController } from './property_value.controller';
import { PropertyValueService } from './property_value.service';
import { SeedPropertyValue } from './seeds';

@Module({
  imports: [
    SequelizeModule.forFeature([Property_Value]),
    SeederModule.forFeature([SeedPropertyValue]),
  ],
  controllers: [PropertyValueController],
  providers: [PropertyValueService],
})
export class PropertyValueModule {}
