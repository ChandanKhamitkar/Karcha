import { Component, Input, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {categoryType} from "../../model/category.type";
@Component({
  selector: 'app-category-item',
  imports: [
    MatIconModule,
    
  ],
  templateUrl: './category-item.component.html',
  styleUrl: './category-item.component.css'
})
export class CategoryItemComponent {
  @Input() item! : categoryType;
  isChoosen = signal<boolean>(false);

  chooseItem(){
    // this.isChoosen.update((val) => {
    //   return !val;
    // })
    
  }
}
