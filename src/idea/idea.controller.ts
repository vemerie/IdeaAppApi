import { Controller, Get, Post, Put, Delete, Body, Param, UsePipes, ValidationPipe, Logger } from '@nestjs/common';
import { IdeaService } from './idea.service';
import { IdeaDTO } from './idea.dto';

@Controller('idea')
export class IdeaController {
    private logger = new Logger('IdeaController')
    constructor(private ideaService:IdeaService){

    }

    @Get()
    showAllIdeas(){
        return this.ideaService.showAll();
    }
    @Post()
    @UsePipes(new ValidationPipe())
    createIde(@Body() data:IdeaDTO){
        this.logger.log(JSON.stringify(data))
        return this.ideaService.create(data)
    }
    @Get(':id')
    readIdea(@Param('id') id:string){
        return this.ideaService.read(id)
    }

    @Put(':id')
    @UsePipes(new ValidationPipe())
    updateIdea(@Param('id') id:string,@Body() data:Partial<IdeaDTO>){
        this.logger.log(JSON.stringify(data))
return this.ideaService.update(id,data)
        }
    @Delete(':id')
    deleteIdea(@Param('id') id:string){
        return this.ideaService.destroy(id)
    }



}
