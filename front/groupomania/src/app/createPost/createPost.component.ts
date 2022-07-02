import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { CookieService } from 'ngx-cookie-service';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { PostsService } from '../posts.service';
import { HttpClient } from '@angular/common/http';


    @Component({
          selector: 'app-createPost',
          templateUrl: './createPost.component.html',
          styleUrls: ['./createPost.component.css']
        })

        export class CreatePostComponent implements OnInit {
          postForm!: UntypedFormGroup;
          isSubmitted = false;
          username=(this.cookieService.get('userdata'))
          file! : File
        
          
          constructor(private http:HttpClient, private userService:UserService,private formBuilder: UntypedFormBuilder,private postService:PostsService, private cookieService:CookieService) { }

              ngOnInit(): void {
              




                this.postForm = this.formBuilder.group({
                idUSERS:[''],
                message:[''],
                username:[''],
                created_at:[''],
                imageUrl:[''],
                file:['']})


              }
             onFileAdded(){

             } 
             createPost(){

          this.isSubmitted=true;
          this.postService.addPost(this.postForm.value).subscribe(data=>{
            console.log(data)
          })


         }
            }

        
   
        
              
      
    
    


  
  
    
     
 
    
  

//  createPost(){

//    this.isSubmitted=true;
 

//   this.postService.addPost(this.postForm.value).subscribe(res=>{
//  alert(JSON.stringify(res))

//   })

//  }

 



 

 
