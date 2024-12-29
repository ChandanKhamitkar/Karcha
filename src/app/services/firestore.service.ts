import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection } from "@angular/fire/firestore";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: Firestore) { }
}
