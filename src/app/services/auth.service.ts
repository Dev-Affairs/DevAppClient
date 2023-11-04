import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    baseURL = "../"//http://localhost:3000/api"
  constructor(
    private http : HttpClient,
    private appService: AppService
    ) { }


    public config : any = {
      "baseUrl": "http://127.0.0.1:3000"
    }

  // Register a new user
  register(userData : {username : string,email : string,password : string}): Observable<any> {
    let reqUrl = this.config.baseUrl + `/api/register`
    console.log("req url --=-", reqUrl)
    return this.http.post(reqUrl,userData);
  }


  // test(data: any): Observable<any> {
  //   return this.http.post(`../test`,data);
  // }

  login(userData : {username : string,password : string}): Observable<any> {
    let primaryConf: any = this.appService.getPrimaryConfig()
    console.log("primaryConf-==-", primaryConf)
    let reqUrl = primaryConf.baseUrl + `/api/login`
    console.log("req url --=-", reqUrl)
    return this.http.post(reqUrl,userData);
  }


}
