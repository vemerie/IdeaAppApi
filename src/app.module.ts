import {TypeOrmModule} from '@nestjs/typeorm'
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IdeaModule } from './idea/idea.module';
import { IdeaEntity } from './idea/idea.entity';
import { HttpErrorFilter } from './shared/http-error.filter';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './shared/logging.interceptor';
import { UserModule } from './user/user.module';
import { UserEntity } from './user/user.entity';
import { ConfigModule } from 'nestjs-dotenv';


@Module({
  imports: [
    
    TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'db',
    entities: [
      IdeaEntity,
      UserEntity
    ],
    synchronize: true,
  }),
   IdeaModule,
   UserModule,
  

   ConfigModule.forRoot(),

  ],
  controllers: [AppController],

  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass:HttpErrorFilter
    },

    {
      provide: APP_INTERCEPTOR,
      useClass:LoggingInterceptor
    },
  
  ]

  })
export class AppModule {}
