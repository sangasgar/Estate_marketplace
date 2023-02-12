import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '../user/user.module';
import configuration from '../../config/configuration';
import { SequelizeModule } from '@nestjs/sequelize';
import { Users } from '../user/models/user.model';
import { AuthModule } from '../auth/auth.module';
import { TokenService } from '../token/token.service';
import { TokenModule } from '../token/token.module';
import { JwtService } from '@nestjs/jwt';
import { WatchlistModule } from '../watchlist/watchlist.module';
import { Watchlist } from '../watchlist/models/watchlist.model';
import { Role } from '../admin/role/model/role.model';
import { RoleModule } from '../admin/role/role.module';
import { CompanyModule } from '../admin/company/company.module';
import { Person } from '../admin/person/model/person.model';
import { Company } from '../admin/company/model/company.model';
import { PersonModule } from '../admin/person/person.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
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
        models: [Users, Watchlist, Role, Person, Company],
      }),
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
    TokenModule,
    WatchlistModule,
    RoleModule,
    CompanyModule,
    PersonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
