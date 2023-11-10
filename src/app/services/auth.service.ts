import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap,BehaviorSubject } from "rxjs";
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    // baseURL = "http://localhost:3000/api"
    baseURL = "../api"
  constructor(
    private http : HttpClient,
    ) { }

     // BehaviorSubject to keep track of user roles
    private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

    private readonly TOKEN_KEY = 'access_token';

    private hasToken(): boolean {
      return !!localStorage.getItem('access_token');
    }
  
  // Register a new user
  register(userData : {username : string,email : string,password : string}): Observable<any> {
    return this.http.post(`${this.baseURL}/generate-otp`,userData)
  }

  submit_otp(userData:{otp:string,email:string}): Observable<any> {
    console.log(userData);
    return this.http.post(`${this.baseURL}/verify-otp`,{userData})
  }


  login(userData : {username : string,password : string}): Observable<any> {
   return this.http.post(`${this.baseURL}/login`,userData).pipe(
    tap((response:any)=>{
        localStorage.setItem("access_token",response.accessToken);
        localStorage.setItem("refresh_token",response.refreshToken)
        this.loggedIn.next(true);
    })
   )
  }

  refreshToken(refreshToken: string): Observable<any> {
    return this.http.post(`${this.baseURL}/refresh`, { refreshToken });
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.loggedIn.next(false);
  }

  
  getUserRole(): string | null {
    const token = localStorage.getItem(this.TOKEN_KEY);

    if (token) {
      // Decode the JWT token to get user information
      const tokenPayload = this.decodeToken(token);

      // Check if the token payload contains the role
      if (tokenPayload && tokenPayload.role) {
        return tokenPayload.role;
      }
    }

    return null;
  }

  private decodeToken(token: string): any {
    try {
      // Decode the JWT token
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );

      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error decoding JWT token', error);
      return null;
    }
  }
  
  isAuthenticated(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }
}
