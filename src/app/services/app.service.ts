import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AppService {
    baseURL = "../"//http://localhost:3000/api"
  constructor(private http : HttpClient) { }


  getPrimaryConfig(){
    return this.http.get('/config/primaryConfig.json');
  }
}
