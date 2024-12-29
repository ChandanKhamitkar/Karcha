import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import data from '../../assets/data/categoriesData.json';
import { CategoryItemComponent } from '../category-item/category-item.component';
@Component({
  selector: 'app-categories',
  imports: [CategoryItemComponent, CommonModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent {
  // @Input() item!: { iconName: string; label: string; color: string };
  @Output() categorySelected = new EventEmitter<string>();
  chosen = signal<boolean>(false);
  dataList = data;

  chooseItem(category: string) {
    this.chosen.set(true);
    this.categorySelected.emit(category);
  }
  isChoosen() {
    return this.chosen;
  }
}
