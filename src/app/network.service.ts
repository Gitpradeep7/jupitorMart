import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  private currentUser = new BehaviorSubject<any>(null);
  presentUser = this.currentUser.asObservable();
  constructor(private http: HttpClient) {
  }
    getStore() {
     return this.http.get('https://fakestoreapi.com/products');
    }
    user(data:any){
      this.currentUser.next(data);
    }
    getUser(){
      return this.presentUser;
    }
}
