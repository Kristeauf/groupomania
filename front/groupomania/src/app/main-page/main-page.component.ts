import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { CookieService } from 'ngx-cookie-service';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { PostsService } from '../posts.service';
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
 postForm!: UntypedFormGroup;
  isSubmitted = false;
  username=(this.cookieService.get('userdata'))
  constructor(private userService:UserService,private formBuilder: UntypedFormBuilder,private postService:PostsService, private cookieService:CookieService) { }

  ngOnInit(): void {





this.postForm = this.formBuilder.group({
  idUSERS:[''],
  message:[''],
  username:[''],
  created_at:[''],
  imageUrl:[''],
  file:['']
  

  })


  }

 
 
}
// createPost(){
//   this.isSubmitted=true;
//   this.postService.addPost(this.postForm.value).subscribe(res=>{
// console.log(JSON.stringify(res))

//   })

// }





