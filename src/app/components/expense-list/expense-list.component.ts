import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-expense-list',
  imports: [],
  templateUrl: './expense-list.component.html',
  styleUrl: './expense-list.component.css'
})
export class ExpenseListComponent {
  @Input() item!: {category: string, date: string, expense: string, note: string}
}
