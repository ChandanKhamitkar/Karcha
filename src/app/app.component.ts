import { Component, inject, signal } from '@angular/core';
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
import {MatButtonModule} from '@angular/material/button';
import { ExpenseListComponent } from './components/expense-list/expense-list.component';
import { BottomSheetCustomComponent } from './components/bottom-sheet-custom/bottom-sheet-custom.component';
import { AuthService } from './services/auth.service';
import { log } from 'console';

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
    AsyncPipe
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Expense-tracker';

  private _bottomSheet = inject(MatBottomSheet);
  user$!: AuthService;

  openBottomSheet(): void{
    this.authService.user$.subscribe(user => {
      if(user){
        this._bottomSheet.open(BottomSheetCustomComponent, {
          data : {
            docID : user.uid,
            email : user.email
          },
        });
      }
    })
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
