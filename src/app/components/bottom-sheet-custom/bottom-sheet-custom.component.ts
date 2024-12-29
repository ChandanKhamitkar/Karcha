import { Component, signal, inject, Inject } from '@angular/core';
import { CategoriesComponent } from '../categories/categories.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MAT_BOTTOM_SHEET_DATA } from "@angular/material/bottom-sheet"
import { FormsModule } from '@angular/forms';
import { Firestore, updateDoc, doc, arrayUnion, query, where, collection, limit, getDocs } from '@angular/fire/firestore';
import categoriesData from "../../assets/data/categoriesData.json";
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
  categories = categoriesData;

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: {docID: string, email : string}){
    console.log('Recevied doc id : ', this.data.docID);
  }
  
  enteredExpense = signal<number>(0);
  inputNote = signal<string>('');
  private firestore: Firestore = inject(Firestore);

  async addExpense(category: string){
    const date = new Date();
    
    try {
      const q = query(collection(this.firestore, "users"), where("email","==", this.data.email), limit(1));
      const snapshot = await getDocs(q);
      let actualDocID = '';
      snapshot.forEach((doc) => {
        actualDocID = doc.id;
        console.log('actual doc id = ', doc.id);
      })
      const docRef = doc(this.firestore, 'users', actualDocID);
      const newExpense = {
        expense : this.enteredExpense(),
        note: this.inputNote(),
        category,
        date: date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(',', '')
      };

      await updateDoc(docRef, {
        allExpenses : arrayUnion(newExpense)
      });
      console.log('Expense saved successfully ✅');
      this.enteredExpense.set(0);
      this.inputNote.set('');

    } catch (error) {
      console.error('Error in saving expense : ', error);
    }
  }

  onExpenseInput(event: any) {
    this.enteredExpense.set(event.target.value);
  }
  onInputNote(event: any) {
    this.inputNote.set(event.target.value);
  }

  onCategorySelected(category: string){
    console.log('Choosen category is = ', category);
    this.addExpense(category);
  }
}
