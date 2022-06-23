
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { Router } from  '@angular/router';



import { AuthService } from  '../auth.service';

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
    namePattern = "^[A-Za-z0-9_-]{5,15}$";
    pwdPattern = "^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,12}$";
   
    emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  
  ngOnInit() {this.loginForm  =  this.formBuilder.group({
    userName:['',Validators.required, Validators.pattern(this.namePattern)],
      email: ['',Validators.required, Validators.pattern(this.emailPattern)],
      password: ['', Validators.required, Validators.pattern(this.pwdPattern)]
  });
   }
  
  get formControls() { return this.loginForm.controls; }
  onConnexion(){
    // console.log(this.loginForm.value);
    this.isSubmitted = true;
    if(this.loginForm.invalid){ 
     
      
      return;
    }
  
 
    return this.authService.onConnexion(this.loginForm.value)
 
   } 
signUp(){




 this.authService.onConnexion(this.loginForm.value);

  this.userService.addUser(this.loginForm.value).subscribe();
  
  

}
  login(){
   
    this.userService.connectUser(this.loginForm.value).subscribe();
     this.authService.login();
  }
  logout(){
  
  
    this.userService.disconnectUser(this.loginForm.value).subscribe();
    this.authService.logout();
console.log(localStorage);

  }
}
    
    


  
  
  
 
  

  
  
  
  








