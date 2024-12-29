import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import {
  MatBottomSheet,
  MatBottomSheetModule,
} from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { ExpenseListComponent } from './components/expense-list/expense-list.component';
import { BottomSheetCustomComponent } from './components/bottom-sheet-custom/bottom-sheet-custom.component';
import { AuthService } from './services/auth.service';
import {
  Firestore,
  getDoc,
  query,
  where,
  collection,
  limit,
  getDocs,
  doc,
} from '@angular/fire/firestore';
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
    ExpenseListComponent,
    CommonModule,
    AsyncPipe,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Expense-tracker';
  actualDocID = signal<string>('');
  // expenseList = signal<{category: string, date: string, expense: string, note: string}[]>([]);
  expenseList = signal<any>([]);
  private _bottomSheet = inject(MatBottomSheet);
  private firestore: Firestore = inject(Firestore);
  user$!: AuthService;

  async ngOnInit() {
    try {
      this.authService.user$.subscribe(async (user) => {
        if (user) {
          const q = query(
            collection(this.firestore, 'users'),
            where('email', '==', user?.email),
            limit(1)
          );
          const snapshot = await getDocs(q);
          snapshot.forEach((doc) => {
            this.actualDocID.set(doc.id);
          });
          const docRef = doc(this.firestore, 'users', this.actualDocID());
          const docSnap = await getDoc(docRef);
          const data = docSnap.data();
          if(data){
            this.expenseList.set(data['allExpenses']);
            console.log('Doc retrivied : ', data['allExpenses']);
          }
        }
      });

    } catch (error) {
      console.error('Error in fetching user data! : ', error);
    }
  }

  openBottomSheet(): void {
    this.authService.user$.subscribe((user) => {
      if (user) {
        this._bottomSheet.open(BottomSheetCustomComponent, {
          data: {
            docID: user.uid,
            email: user.email,
          },
        });
      }
    });
  }

  constructor(public authService: AuthService) {
    this.user$ = authService;

    this.authService.user$.subscribe((userData) => {
      console.log('user displayName : ', userData?.displayName);
      console.log('user photoURL : ', userData?.photoURL);
      console.log('user uid : ', userData?.uid);
    });
  }

  login() {
    this.authService.googleSignIn();
  }

  logout() {
    this.authService.signOut();
  }
}
