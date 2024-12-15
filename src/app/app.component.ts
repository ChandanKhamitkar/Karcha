import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import {
  MatBottomSheet,
  MatBottomSheetModule,
} from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';
import { ExpenseListComponent } from './components/expense-list/expense-list.component';
import { BottomSheetCustomComponent } from './components/bottom-sheet-custom/bottom-sheet-custom.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule, 
    MatBottomSheetModule,
    ExpenseListComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Expense-tracker';

  private _bottomSheet = inject(MatBottomSheet);

  openBottomSheet(): void{
    this._bottomSheet.open(BottomSheetCustomComponent);
  }
}
