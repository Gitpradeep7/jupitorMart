import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { LoginUserService } from './services/loginuser.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  private currentUser = new BehaviorSubject<any>(null);
  presentUser = this.currentUser.asObservable();

  private isLogout = new BehaviorSubject<boolean>(false);
  isLogout$ = this.isLogout.asObservable();

  constructor(private http: HttpClient, private loginservice: LoginUserService, private router: Router) {
  }
  ngOnInit(){
    this.loginservice.getloginUser().subscribe((res:any)=>{
      this.currentUser.next(res);
    })
  }
    getStore() {
     return this.http.get('https://fakestoreapi.com/products');
    }

    getProduct(id:any){
      return this.http.get(`https://fakestoreapi.com/products/${id}`);
    }
    currUser(data:any){
      console.log('data 123 ',data);
      if(data === null){
        this.loginservice.deleteloginUser(data?.id).subscribe((res:any) =>{
          console.log('delete :: ',res);
          this.router.navigate(['/login']);
        });
      } else {
        this.loginservice.addloginUser(data).subscribe((res:any)=>{
          console.log(res,' ADD ::');
        });
      }
        this.currentUser.next(data);
      }
      
      getUser(){
      let user;
      this.loginservice.getloginUser().subscribe((res:any)=>{
        user = res;
      });
      return this.presentUser || of(user);
    }

    logout(islogout: boolean){
      this.isLogout.next(islogout);
    }

    logoutFlag(){
      return this.isLogout$;
    }
}
