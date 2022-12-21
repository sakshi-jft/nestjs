import { Controller, Get,Post,Put,Delete,Body,Req,Res,Param} from '@nestjs/common';
import  {CreateItemDto} from "./dto/create-items.dto";
import {UpdateItemDto} from "./dto/update-item.dto";
// import {Request,Response} from 'express';
import { ItemsService } from './items.service';
import {Item} from "./Interfaces/item.interface";
@Controller('items')
export class ItemsController {
    constructor (private readonly itemsService:ItemsService) {}
    @Get()
    findAll(): Item[]{
     return this.itemsService.findAll(); 
    } 
    @Get(':id')
    findOne(@Param('id')id):Item{
        return this.itemsService.findOne(id);
        }

    @Post('add')
    postItem(@Body() CreateItemDto:CreateItemDto):Item{
// return `Name:${CreateItemDto.name} Desc:${CreateItemDto.description}`;
return this.itemsService.postItem({
    name:CreateItemDto.name,
    description:CreateItemDto.description,
    qty:CreateItemDto.qty});  
}
    
    
    @Delete(':id')
    delete(@Param ('id') id):string {
        return this.itemsService.delete_user(id);
    }

    @Put(':id')
    update(@Param('id')id ,@Body() updateItemDto:UpdateItemDto,):Item|string{
      return   this.itemsService.update_user(id,updateItemDto);
    }
}
