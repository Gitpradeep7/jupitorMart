import { Component, inject } from '@angular/core';
import { NetworkService } from '../network.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent {
  constructor(private network: NetworkService){

  }
  private router = inject(Router);
  isLogOut: any;
  ngOnInit(){
    this.network.logoutFlag().subscribe((res) =>{
      this.isLogOut = res;
    })
  }
   logout(){
    localStorage.removeItem('jupiterCurrentUser');
    this.cancel();
    this.router.navigate(['/login']);
  }

  cancel(){
    this.network.logout(false);
  }
}
