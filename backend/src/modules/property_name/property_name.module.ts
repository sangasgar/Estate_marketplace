import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SeederModule } from 'nestjs-sequelize-seeder';
import { Property_Name } from './model/property_name.model';
import { PropertyNameController } from './property_name.controller';
import { PropertyNameService } from './property_name.service';
import { SeedPropertyName } from './seeds';

@Module({
  imports: [
    SequelizeModule.forFeature([Property_Name]),
    SeederModule.forFeature([SeedPropertyName]),
  ],
  controllers: [PropertyNameController],
  providers: [PropertyNameService],
})
export class PropertyNameModule {}
