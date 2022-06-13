import { Injectable } from '@angular/core';
import {User} from  './user';
@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor() { }
  public connexion(userInfo: User){
    localStorage.setItem('ACCESS_TOKEN', "access_token");
  }
  public isConnected(){
    return localStorage.getItem('ACCESS_TOKEN') !== null;

  }
  public deconnected(){
    localStorage.removeItem('ACCESS_TOKEN');
  }
}
