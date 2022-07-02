import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import { HttpClient } from '@angular/common/http';
import { Post } from '../Post'
@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.css']
})
export class PostPageComponent implements OnInit {

  constructor(private http:HttpClient,private postService:PostsService) { }
post!:Post
  ngOnInit(): void {
    alert('ok')
    this.postService.getPosts(this.post).subscribe(data=>{
      alert(data);
      
    })
  }

}
