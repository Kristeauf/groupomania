import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { Router } from  '@angular/router';


import { AuthService } from  '../auth.service';
 import { User} from "../user";
import { UserService } from '../user.service';

@Component({
  selector: 'app-logg',
  templateUrl: './logg.component.html',
  styleUrls: ['./logg.component.css']
})
export class LoggComponent implements OnInit {

  loginForm!: FormGroup;
  isSubmitted  =  false;
 
  constructor(private authService: AuthService,
    private router: Router, private formBuilder: FormBuilder,private userService:UserService) { } //,)//

  ngOnInit() {this.loginForm  =  this.formBuilder.group({
    userName:['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
  });
   }
  get formControls() { return this.loginForm.controls; }
  onConnexion(){
    // console.log(this.loginForm.value);
    this.isSubmitted = true;
    if(this.loginForm.invalid){
      return;
    }
  
   
    this.authService.onConnexion(this.loginForm.value);
  
  } 
  
signUp(){
alert(JSON.stringify(this.loginForm.value));
  this.userService.addUser(this.loginForm.value);
  
  
}
    
    


  
  
  
 
  

  
  
  
  

}




function addUser(value: any) {
  throw new Error('Function not implemented.');
}

