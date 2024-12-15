import { Component } from '@angular/core';
import data from "../../assets/data/categoriesData.json";
import { CategoryItemComponent } from '../category-item/category-item.component';
@Component({
  selector: 'app-categories',
  imports: [CategoryItemComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {
  dataList = data;
}
