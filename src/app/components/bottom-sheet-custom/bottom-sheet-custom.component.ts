import { Component, signal } from '@angular/core';
import { CategoriesComponent } from '../categories/categories.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bottom-sheet-custom',
  imports: [
    CategoriesComponent,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  templateUrl: './bottom-sheet-custom.component.html',
  styleUrl: './bottom-sheet-custom.component.css',
})
export class BottomSheetCustomComponent {
  enteredExpense = signal<number>(0);
  inputNote = signal<string>('');

  onExpenseInput(event: any) {
    this.enteredExpense.set(event.target.value);
  }
  onInputNote(event: any) {
    this.inputNote.set(event.target.value);
  }
}
