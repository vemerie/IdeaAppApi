import {TypeOrmModule} from '@nestjs/typeorm'
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IdeaModule } from './idea/idea.module';
import { IdeaEntity } from './idea/idea.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'db',
    entities: [IdeaEntity],
    synchronize: true,
  }), IdeaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
