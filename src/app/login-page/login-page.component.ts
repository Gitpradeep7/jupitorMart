import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NetworkService } from '../network.service';
import { Router } from '@angular/router';
import { FORM_VALIDATION } from '../shared/reusable-components/card/constant';
import { LoginUserService } from '../services/loginuser.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  validations: any =FORM_VALIDATION;
   loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private network: NetworkService, private loginuserservice: LoginUserService,private userservice: UserService, private router: Router) {}

  onLogin() {
  let userIndex;
  //let loginIndex;
  this.userservice.getUsers().subscribe((user:any) =>{
   userIndex = this.checkUser(user,this.loginForm.value);
   if(userIndex != -1){
    // this.loginuserservice.getloginUser().subscribe((res:any) =>{
    //   loginIndex = this.checkUser(res, this.loginForm.value);
    //   console.log('loginindex',loginIndex);
    //   if(loginIndex != -1) {
    //   } else {
    //     this.loginuserservice.addloginUser(this.loginForm.value).subscribe((res:any) =>{
    //       alert('login ');
    //     });
    //   }
    //   this.network.currUser(this.loginForm.value);
    //   this.router.navigate(['/home']);
    // })
      this.network.currUser(user[userIndex]);
      // this.loginuserservice.addloginUser(user[userIndex]).subscribe((res:any) =>{
      //     alert('login ');
      //   });
      this.router.navigate(['/home']);
   } else {
     alert('not a user');
   }
  });
  }

  checkUser(users:any,loginuser:any){
    let index = users.findIndex((res:any) =>{
       return res.email == loginuser.email;
    });
    let passIndex = users.findIndex((res:any)=>{
      return res.password == loginuser.password;
    })
    if(index === passIndex && index != -1) {
      return index;
    } else {
      return -1;
    }
  }
}
