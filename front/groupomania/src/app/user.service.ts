// import {Injectable} from "@angular/core";
// import { HttpClient } from "@angular/common/http";
// import {  User} from "./user";
// import {AuthService  } from "./auth.service";
// import {Observable} from "rxjs";

// @Injectable()
// export class UserService {
// constructor(private http:HttpClient,public authService:AuthService){}
// create(data:User):Observable<any>{return this.http.post(`${baseUrl}'/auth/signup`,data)}
// }



import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { User } from './user';
const headers = new HttpHeaders()
.set('content-type','application/json')

.set('authorization','Access Token')
  
 

const baseUrl = 'http://localhost:3000/api'
@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }
 
       

 
    //     register(user: User) {
    //         return this.http.post(`${baseUrl}/auth/signup`, user);
    //     }

    //     delete(id: number) {
    //         return this.http.delete(`${baseUrl}/users/${id}`);
    //     }
    // }
    addUser(user: User): Observable<User> {
   
     const userData = JSON.stringify(user);
 
        return this.http.post<User>(`${baseUrl}/auth/signup`,userData,{headers:headers})
    }
    connectUser(user: User):Observable<User>{

        const userData = JSON.stringify(user);

       return this.http.post<User>(`${baseUrl}/auth/login`,userData,{headers:headers})

    }
    disconnectUser(user: User):Observable<User>{
        
       return this.http.get<User>(`${baseUrl}/auth/logout`)

    }
    
}
