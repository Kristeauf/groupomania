import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Post } from './Post';
const headers = new HttpHeaders()
.set('content-type','application/json')
.set('Authorization','Sntoken')




const baseUrl = 'http://localhost:3000/api'
@Injectable({ providedIn: 'root' })
export class PostsService {
    constructor(private http: HttpClient) { }
 
       

 
    //     register(user: User) {
    //         return this.http.post(`${baseUrl}/auth/signup`, user);
    //     }

    //     delete(id: number) {
    //         return this.http.delete(`${baseUrl}/users/${id}`);
    //     }
    // }
    addPost(post: Post): Observable<Post> {
   
     const postData = JSON.stringify(post);
 
        return this.http.post<Post>(`${baseUrl}/posts`,postData,{headers:headers})
    }
    getPosts(post: Post):Observable<Post>{

         const postData = JSON.stringify(post);

     return this.http.get<Post>(`${baseUrl}/posts`,{headers:headers})

    }
//     disconnectUser(user: User):Observable<User>{
        
//        return this.http.get<User>(`${baseUrl}/auth/logout`)

//     }
    
 }
