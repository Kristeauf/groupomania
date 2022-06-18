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
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, } from 'rxjs';
import { User } from './user';
import { catchError, retry } from "rxjs/operators";
const baseUrl = ' http://localhost:3000/api'
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
        const formData = new FormData();
        formData.append("userName", user.userName);
        formData.append("email", user.email);
        formData.append("password", user.password);
        return this.http.post<User>(`${baseUrl}/auth/signup`, FormData)

    }


}