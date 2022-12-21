import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from "./Interfaces/item.interface";
@Injectable()
export class ItemsService {
   items: Item[] = []
   findAll(): Item[] {
      return this.items;
   }
   findOne(id: string): Item {
      return this.items.find(item => item.id === id);
   }
   postItem(newItem:Item) :Item{
      newItem.id= Math.random().toString();
      
      this.items.push(newItem);
      return this.items[this.items.length-1]
   }
   delete_user(id: string): string {
      this.items = this.items.filter(item => item.id !== id);
      return `deleted ${id}`;
   }
   private findItem(id: string): [Item, number] {
      const itemIndex = this.items.findIndex((item) => item.id === id)
      const item = this.items[itemIndex];
      if (!item) throw new NotFoundException('Could not find this product')
      return [item, itemIndex];
   }
   update_user(id: string,updatedItem:UpdateItemDto): Item|string {
      //    const  idx=this.items.find(item=>item.id===id);
      //  //   this.items[idx]=
      const [item, idx] = this.findItem(id);
      // const updatedItem = { ...item };
      if (!updatedItem.name) updatedItem.name = item[idx].name;
      if (!updatedItem.description) updatedItem.description = item[idx].description;
      if (!updatedItem.qty) updatedItem.qty =item[idx].qty;

      this.items[idx] = updatedItem;
      return this.items[idx];
   }
}