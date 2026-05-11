import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginUserService {

    private apiUrl = 'http://localhost:3000/loginusers';
  
    constructor(private http: HttpClient) {}
  
    getloginUser(): Observable<any> {
      return this.http.get(this.apiUrl);
    }
  
    addloginUser(loginUser: any): Observable<any> {
      return this.http.post(this.apiUrl, loginUser);
    }
  
    deleteloginUser(id: string): Observable<any> {
      return this.http.delete(`${this.apiUrl}/${id}`);
    }
}
