import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideAnimationsAsync(),
    provideFirebaseApp(() =>
      initializeApp({
        apiKey: 'AIzaSyChsP-HJvYybI2xSKIe0WSJKxOPTdyMb0o',
        authDomain: 'karcha-93e7b.firebaseapp.com',
        projectId: 'karcha-93e7b',
        storageBucket: 'karcha-93e7b.firebasestorage.app',
        messagingSenderId: '415289098798',
        appId: '1:415289098798:web:9d12023a32d9db3e23d5bf',
        measurementId: 'G-RBVTQBG1JZ',
      })
    ),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
  ],
};
