import { Component } from '@angular/core';
import { NetworkService } from '../network.service';
import { BrowserModule } from "@angular/platform-browser";
import { Router } from '@angular/router';
import { LoginUserService } from '../services/loginuser.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent {
  constructor(private network: NetworkService,private loginservice: LoginUserService){

  }
  isLogOut: any;
  ngOnInit(){
    this.network.logoutFlag().subscribe((res) =>{
      this.isLogOut = res;

    })
  }
  async logout(){
    // this.network.getUser().subscribe((res)=>{
    //   this.loginservice.deleteloginUser(res?.id).subscribe((da:any) =>{
    //     console.log('data ',da);
    //   })
    // })
    await this.network.currUser(null);
    this.network
    this.cancel();
    //this.network.logout(false);
  }
  cancel(){
    this.network.logout(false);
  }
}
