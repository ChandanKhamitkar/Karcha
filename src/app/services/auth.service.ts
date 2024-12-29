import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  User,
  setPersistence,
  browserLocalPersistence,
  onAuthStateChanged,
} from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();
  photoURL: string | null = null;
  displayName: string | null = null;
  uid: string | null = null;

  constructor(private auth: Auth) {
    onAuthStateChanged(this.auth, (user) => {
      this.userSubject.next(user);
      if (user) {
        this.photoURL = user.photoURL;
        this.displayName = user.displayName;
        this.uid = user.uid;
      } else {
        this.photoURL = null;
        this.displayName = null;
        this.uid = null;
      }
    });
  }

  async googleSignIn(): Promise<void> {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(this.auth, provider);
      this.userSubject.next(result.user);
      console.log('Google user data:', result.user);
      this.photoURL = result.user.photoURL;
      this.displayName = result.user.displayName;
      this.uid = result.user.uid;
    } catch (error) {
      console.error('Google sign-in error:', error);
    }
  }

  async signOut(): Promise<void> {
    try {
      await signOut(this.auth);
      this.photoURL = '';
      this.displayName = '';
      this.userSubject.next(null);
    } catch (error) {
      console.error('Sign out error: ', error);
    }
  }
}
