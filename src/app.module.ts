import {TypeOrmModule} from '@nestjs/typeorm'
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IdeaModule } from './idea/idea.module';
import { IdeaEntity } from './idea/idea.entity';
import { HttpErrorFilter } from './shared/http-error.filter';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './shared/logging.interceptor';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'db',
    entities: [IdeaEntity],
    synchronize: true,
  }), IdeaModule],
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
