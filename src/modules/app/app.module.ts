import { Module, Query } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '../user/user.module';
import configuration from '../../config/configuration';
import { SequelizeModule } from '@nestjs/sequelize';
import { Users } from '../user/models/user.model';
import { AuthModule } from '../auth/auth.module';
import { TokenModule } from '../token/token.module';
import { WishlistModule } from '../wishlist/wishlist.module';
import { RoleModel } from '../role/model/role.model';
import { RoleModule } from '../role/role.module';
import { CompanyModule } from '../company/company.module';
import { Person } from '../person/model/person.model';
import { Company, Company_Users } from '../company/model/company.model';
import { PersonModule } from '../person/person.module';
import { SeederModule } from 'nestjs-sequelize-seeder';
import { PageModule } from '../page/page.module';
import { Page } from '../page/model/page.model';
import { MenuModule } from '../menu/menu.module';
import { Menu } from '../menu/model/menu.model';
import { Category } from '../category/model/category.model';
import { CategoryModule } from '../category/category.module';
import { SearchHistoryModule } from '../search_history/search_history.module';
import { Search_History } from '../search_history/model/search_history.model';
import { ProductModule } from '../product/product.module';
import {
  Product,
  Products_Media_Types,
  Products_Wishlists,
} from '../product/model/product.model';
import { MediaTypeModule } from 'src/modules/media_type/media_type.module';
import { Media_type } from '../media_type/model/media_type.model';
import { Wishlist } from '../wishlist/model/wishlist.model';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    SeederModule.forRoot({
      runOnlyIfTableIsEmpty: true,
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        dialect: 'postgres',
        host: configService.get('db_host'),
        username: configService.get('db_username'),
        password: configService.get('db_password'),
        database: configService.get('db_name'),
        synchronize: true,
        autoLoadModels: true,
        models: [
          Users,
          Wishlist,
          RoleModel,
          Person,
          Company,
          Company_Users,
          Page,
          Menu,
          Category,
          Search_History,
          Product,
          Media_type,
          Products_Media_Types,
          Products_Wishlists,
        ],
      }),
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
    TokenModule,
    WishlistModule,
    RoleModule,
    CompanyModule,
    PersonModule,
    PageModule,
    MenuModule,
    CategoryModule,
    SearchHistoryModule,
    ProductModule,
    MediaTypeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
