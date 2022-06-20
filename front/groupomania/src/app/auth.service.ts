import { Injectable } from '@angular/core';
import {User} from  './user';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  public onConnexion(userInfo: User){
    localStorage.setItem('ACCESS_TOKEN', "access_token");
    console.log(localStorage);
    
  }
  public isConnected(){
    return localStorage.getItem('ACCESS_TOKEN') !== null;

  }
  public deconnected(){
    localStorage.removeItem('ACCESS_TOKEN');
  }
}
